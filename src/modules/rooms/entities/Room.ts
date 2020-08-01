import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/entities/User';
import RoomParticipant from './RoomParticipant';

@Entity('rooms')
class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'host_user' })
  hostUser: string;

  @Column({ name: 'capacity_limit', nullable: true, default: 5 })
  capacityLimit: string;

  @OneToMany(type => RoomParticipant, room => Room)
  @JoinColumn({ name: 'room_id' })
  participants: RoomParticipant[];

  @OneToOne(type => User, room => Room, { eager: true })
  @JoinColumn({ name: 'host_user' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Room;
