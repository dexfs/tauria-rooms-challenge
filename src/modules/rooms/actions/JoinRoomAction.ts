import { getCustomRepository } from 'typeorm';
import RoomRepository from '../repositories/RoomRepository';
import RoomParticipantRepository from '../repositories/RoomParticipantRepository';

import Room from '../entities/Room';

interface Input {
  userId: string;
  roomId: string;
}

class JoinRoomAction {
  public async execute({ userId, roomId }: Input): Promise<Room | undefined> {
    const roomRepository = getCustomRepository(RoomRepository);
    const roomParticipantRepository = getCustomRepository(
      RoomParticipantRepository,
    );
    const room = await roomRepository.findOne(roomId);

    if (!room) {
      throw new Error('The room does not exits.');
    }

    if (room.hostUser === userId) {
      throw new Error("You're the host.");
    }

    const countMembersRoom = await roomParticipantRepository.count({
      where: { roomId },
    });

    if (countMembersRoom >= room.capacityLimit) {
      throw new Error('Maximum room members reached');
    }

    const participantJoin = await roomParticipantRepository.create({
      userId,
      roomId,
    });
    await roomParticipantRepository.save(participantJoin);
    return roomRepository.findOne({
      relations: ['participants'],
      where: { id: roomId },
    });
  }
}

export default JoinRoomAction;
