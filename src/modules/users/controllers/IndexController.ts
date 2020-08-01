import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserAction from '@modules/users/actions/CreateUserAction';
import UpdateUserAction from '@modules/users/actions/UpdateUserAction';
import DeleteUserAction from '@modules/users/actions/DeleteUserAction';

import UsersRepository from '../repositories/UsersRepository';

class IndexController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.json(users);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByUsername(request.params.username);
    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createUserAction = new CreateUserAction();
    const user = await createUserAction.execute(request.body);

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAction = new UpdateUserAction();
    const user = await updateUserAction.execute({
      id: request.user.id,
      ...request.body,
    });

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<void> {
    await new DeleteUserAction().execute({ id: request.user.id });
    return response.status(200).end();
  }
}
export default IndexController;
