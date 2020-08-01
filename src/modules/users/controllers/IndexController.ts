import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserAction from '@modules/users/actions/CreateUserAction';
import UsersRepository from '../repositories/UsersRepository';

class IndexController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createUserAction = new CreateUserAction();
    const user = await createUserAction.execute(request.body);

    return response.json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByUsername(request.params.username);
    return response.json(user);
  }
}

export default IndexController;
