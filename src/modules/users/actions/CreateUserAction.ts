import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserRepository from '@modules/users/repositories/UsersRepository';
import TokenService from '@modules/users/services/tokenService';
import User from '../entities/User';

interface Input {
  username: string;
  password: string;
  mobileToken?: string;
}

class CreateUserAction {
  public async execute({
    username,
    password,
    mobileToken,
  }: Input): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByUsername(username);

    if (userExists) {
      throw Error(`Oh no!, this ${username} already used`);
    }

    const passwordHashed = await this.passwordHasher(password);
    const user = await userRepository.create({
      username,
      password: passwordHashed,
      mobileToken,
    });

    await userRepository.save(user);

    delete user.password;

    const tokenService = new TokenService();
    const token = tokenService.generate(user.id);
    return {
      user,
      token,
    };
  }

  private passwordHasher(password: string): Promise<string> {
    return hash(password, 10);
  }
}

export default CreateUserAction;
