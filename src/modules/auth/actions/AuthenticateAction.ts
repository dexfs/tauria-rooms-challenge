import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import UserRepository from '@modules/users/repositories/UsersRepository';
import User from '@modules/users/entities/User';
import TokenService from '@modules/users/services/tokenService';

interface Input {
  username: string;
  password: string;
}

interface AuthResult {
  user: User;
  token: string;
}

class AuthenticateAction {
  public async execute({ username, password }: Input): Promise<AuthResult> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });

    if (!user) {
      throw Error('Your username and/or password do not match.');
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw Error('Your username and/or password do not match.');
    }

    const tokenService = new TokenService();
    const token = tokenService.generate(user.id);
    delete user.password;
    return {
      user,
      token,
    };
  }
}

export default AuthenticateAction;
