import { getCustomRepository } from 'typeorm';
import RoomRepository from '../repositories/RoomRepository';
import Room from '../entities/Room';

interface Input {
  roomId: string;
  currentHost: string;
  newHost: string;
}

class ChangeRoomHostAction {
  public async execute({
    roomId,
    currentHost,
    newHost,
  }: Input): Promise<Room | undefined> {
    const roomRepository = getCustomRepository(RoomRepository);

    const roomFound = await roomRepository.findByIdAndHost({
      roomId,
      hostId: currentHost,
    });

    if (!roomFound) {
      throw new Error('Room not found.');
    }
    await roomRepository.update(roomFound.id, { hostUser: newHost });
    const room = await roomRepository.findOne(roomFound.id);

    return room;
  }
}

export default ChangeRoomHostAction;
