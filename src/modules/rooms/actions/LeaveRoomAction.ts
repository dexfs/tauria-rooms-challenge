import { getCustomRepository, DeleteResult } from 'typeorm';
import RoomRepository from '../repositories/RoomRepository';
import RoomParticipantRepository from '../repositories/RoomParticipantRepository';

import Room from '../entities/Room';

interface Input {
  userId: string;
  roomId: string;
}

class LeaveRoomAction {
  public async execute({ userId, roomId }: Input): Promise<void> {
    const roomParticipantRepository = getCustomRepository(
      RoomParticipantRepository,
    );

    await roomParticipantRepository.delete({
      userId,
      roomId,
    });
  }
}

export default LeaveRoomAction;
