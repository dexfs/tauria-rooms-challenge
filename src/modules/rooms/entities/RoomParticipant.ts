import {
  PrimaryColumn,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/entities/User';
import Room from './Room';

@Entity('room_participants')
class RoomParticipant {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'room_id' })
  roomId: string;

  @ManyToOne(type => Room, room => room.participants, { primary: true })
  @JoinColumn({ name: 'room_id' })
  room: Room[];

  @ManyToOne(type => User, user => user.rooms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default RoomParticipant;
