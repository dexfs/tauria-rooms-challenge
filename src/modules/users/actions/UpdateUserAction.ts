import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import UserRepository from '@modules/users/repositories/UsersRepository';
import User from '../entities/User';

interface Input {
  id: string;
  currentPassword: string;
  newPassword: string;
  mobileToken?: string;
}

class UpdateUserAction {
  public async execute({
    id,
    currentPassword,
    newPassword,
    mobileToken,
  }: Input): Promise<User | undefined> {
    if (!currentPassword || !newPassword) {
      throw Error("It's necessary to pass the current and the new password.");
    }

    const userRepository = getCustomRepository(UserRepository);
    const userFound = await userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'password'],
    });

    if (!userFound) {
      throw Error(`Oh no!, user not found`);
    }

    const isCorrectPassword = await compare(
      currentPassword,
      userFound.password,
    );

    if (!isCorrectPassword) {
      throw Error('Current password is not valid.');
    }

    const passwordHash = await hash(newPassword, 10);

    const user = await userRepository.save({
      ...userFound,
      password: passwordHash,
      mobileToken,
    });

    delete user.password;

    return user;
  }
}

export default UpdateUserAction;