import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import RoomRepository from '../repositories/RoomRepository';
import CreateRoomAction from '../actions/CreateRoomAction';
import ChangeRoomHostAction from '../actions/ChangeRoomHostAction';

class IndexController {
  async index(request: Request, response: Response): Promise<Response> {
    const roomRepository = getCustomRepository(RoomRepository);
    const rooms = await roomRepository.find();
    return response.json(rooms);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createRoom = new CreateRoomAction();
    const room = await createRoom.execute({
      hostUser: request.user.id,
      ...request.body,
    });
    return response.json(room);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const changeHostAction = new ChangeRoomHostAction();
    const room = await changeHostAction.execute({
      currentHost: request.user.id,
      ...request.body,
    });
    return response.json(room);
  }
}

export default IndexController;
