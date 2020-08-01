import { getCustomRepository } from 'typeorm';
import RoomRepository from '../repositories/RoomRepository';
import Room from '../entities/Room';

interface Input {
  name: string;
  hostUser: string;
  capacity?: number;
}

class CreateRoomAction {
  public async execute(input: Input): Promise<Room> {
    const roomRepository = getCustomRepository(RoomRepository);
    const room = await roomRepository.create(input);
    await roomRepository.save(room);
    return room;
  }
}

export default CreateRoomAction;
