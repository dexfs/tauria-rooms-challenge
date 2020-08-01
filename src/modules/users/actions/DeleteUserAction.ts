import { getCustomRepository } from 'typeorm';

import UserRepository from '@modules/users/repositories/UsersRepository';

interface Input {
  id: string;
}

class DeleteUserAction {
  public async execute({ id }: Input): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    await userRepository.delete(id);
  }
}

export default DeleteUserAction;
