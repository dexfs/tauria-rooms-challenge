import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import RoomParticipant from '@modules/rooms/entities/RoomParticipant';
import Room from '@modules/rooms/entities/Room';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'mobile_token', nullable: true })
  mobileToken: string;

  @OneToMany(() => Room, room => room.user)
  hostRooms: Room[];

  @OneToMany(type => RoomParticipant, roomParticipant => roomParticipant.user)
  rooms: RoomParticipant[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default User;
