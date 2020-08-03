import { EntityRepository, Repository } from 'typeorm';
import RoomParticipant from '../entities/RoomParticipant';

@EntityRepository(RoomParticipant)
class RoomParticipantRepository extends Repository<RoomParticipant> {}

export default RoomParticipantRepository;
