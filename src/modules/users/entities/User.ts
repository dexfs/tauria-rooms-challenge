/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { validateOrReject, IsDefined, IsNotEmpty } from 'class-validator';

import { hash } from 'bcryptjs';

import RoomParticipant from '@modules/rooms/entities/RoomParticipant';
import Room from '@modules/rooms/entities/Room';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @Column({ select: false, nullable: false })
  @IsNotEmpty()
  password: string;

  @Column({ name: 'mobile_token', nullable: true })
  mobileToken: string;

  @OneToMany(() => Room, room => room.host)
  hostRooms: Room[];

  @OneToMany(type => RoomParticipant, roomParticipant => roomParticipant.user)
  rooms: RoomParticipant[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }

  // HOOKS
  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    return validateOrReject(this);
  }
}

export default User;
