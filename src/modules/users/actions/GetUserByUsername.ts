import { getCustomRepository } from 'typeorm';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import { NotFound } from '@shared/utils/errors';
import User from '../entities/User';

interface Input {
  username: string;
}

class GetUserByUsername {
  async execute({ username }: Input): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByUsername(username);
    if (!user) {
      throw new NotFound('User not found.');
    }

    return user;
  }
}

export default GetUserByUsername;
