import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserAction from '@modules/users/actions/CreateUserAction';
import UpdateUserAction from '@modules/users/actions/UpdateUserAction';
import DeleteUserAction from '@modules/users/actions/DeleteUserAction';
import GetUserByUsername from '../actions/GetUserByUsername';

import UsersRepository from '../repositories/UsersRepository';

class IndexController {
  static async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.json(users);
  }

  static async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const getUserByUsername = new GetUserByUsername();
    const user = await getUserByUsername.execute({ username });
    return response.json(user);
  }

  static async create(request: Request, response: Response): Promise<Response> {
    const createUserAction = new CreateUserAction();
    const user = await createUserAction.execute(request.body);

    return response.status(201).json(user);
  }

  static async update(request: Request, response: Response): Promise<Response> {
    const updateUserAction = new UpdateUserAction();
    const user = await updateUserAction.execute({
      id: request.user.id,
      ...request.body,
    });

    return response.json(user);
  }

  static async delete(request: Request, response: Response): Promise<void> {
    await new DeleteUserAction().execute({ id: request.user.id });
    return response.status(200).end();
  }
}
export default IndexController;
