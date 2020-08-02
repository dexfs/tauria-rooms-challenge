import { getCustomRepository } from 'typeorm';
import RoomParticipantRepository from '../repositories/RoomParticipantRepository';

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
