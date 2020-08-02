import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import RoomRepository from '../repositories/RoomRepository';
import CreateRoomAction from '../actions/CreateRoomAction';
import ChangeRoomHostAction from '../actions/ChangeRoomHostAction';
import JoinRoomAction from '../actions/JoinRoomAction';
import LeaveRoomAction from '../actions/LeaveRoomAction';

class RoomsController {
  static async show(request: Request, response: Response): Promise<Response> {
    const { roomId } = request.params;
    const roomRepository = getCustomRepository(RoomRepository);
    const rooms = await roomRepository.findOne(roomId);
    return response.json(rooms);
  }

  static async create(request: Request, response: Response): Promise<Response> {
    const createRoom = new CreateRoomAction();
    const room = await createRoom.execute({
      hostUser: request.user.id,
      ...request.body,
    });
    return response.json(room);
  }

  static async update(request: Request, response: Response): Promise<Response> {
    const changeHostAction = new ChangeRoomHostAction();
    const room = await changeHostAction.execute({
      currentHost: request.user.id,
      ...request.body,
    });
    return response.json(room);
  }

  static async join(request: Request, response: Response): Promise<Response> {
    const joinRoomAction = new JoinRoomAction();
    const room = await joinRoomAction.execute({
      userId: request.user.id,
      roomId: request.params.roomId,
    });
    return response.json(room);
  }

  static async leave(request: Request, response: Response): Promise<void> {
    const leaveRoomAction = new LeaveRoomAction();
    await leaveRoomAction.execute({
      userId: request.user.id,
      roomId: request.params.roomId,
    });
    return response.end();
  }
}

export default RoomsController;
