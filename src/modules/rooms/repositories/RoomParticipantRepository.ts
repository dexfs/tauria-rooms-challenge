import { EntityRepository, Repository } from 'typeorm';
import RoomParticipant from '../entities/RoomParticipant';

@EntityRepository(RoomParticipant)
class RoomRepository extends Repository<RoomParticipant> {}

export default RoomRepository;
