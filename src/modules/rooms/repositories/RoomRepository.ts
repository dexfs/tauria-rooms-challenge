import { EntityRepository, Repository } from 'typeorm';
import Room from '../entities/Room';

interface IFindByIdAndHost {
  roomId: string;
  hostId: string;
}

@EntityRepository(Room)
class RoomRepository extends Repository<Room> {
  public async findByIdAndHost({
    roomId,
    hostId,
  }: IFindByIdAndHost): Promise<Room | undefined> {
    return this.findOne({
      where: { id: roomId, hostUser: hostId },
    });
  }
}

export default RoomRepository;
