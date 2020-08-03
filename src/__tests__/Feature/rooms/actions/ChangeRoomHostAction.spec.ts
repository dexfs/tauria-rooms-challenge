import 'reflect-metadata';
import { Not, getCustomRepository } from 'typeorm';
import { useSeeding, runSeeder, tearDownDatabase } from 'typeorm-seeding';
import CreateRoomsSeeder from '@database/seeds/CreateRoomsSeeder';
import ChangeRoomHostAction from '@modules/rooms/actions/ChangeRoomHostAction';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import RoomRepository from '@modules/rooms/repositories/RoomRepository';

import ServerFactory from '../../../../server';

describe('ChangeRoomHostAction', () => {
  beforeAll(async done => {
    await ServerFactory.connectionPGCreate();
    await useSeeding({ connection: 'test' });
    done();
  });
  beforeEach(async done => {
    await runSeeder(CreateRoomsSeeder);
    done();
  });

  afterAll(async done => {
    await tearDownDatabase();
    done();
  });

  it('should return rooms of a user by username', async () => {
    const userRepository = getCustomRepository(UsersRepository);
    const roomRepository = getCustomRepository(RoomRepository);
    const action = new ChangeRoomHostAction();
    const room = await roomRepository.findOne();
    const users = await userRepository.find({
      id: Not(room?.hostUser as string),
    });
    const user = users[Math.floor(Math.random() * users.length)];
    const roomUpdated = await action.execute({
      roomId: room?.id as string,
      currentHost: room?.hostUser as string,
      newHost: user.id,
    });
    expect(roomUpdated).not.toBeNull();
    expect(roomUpdated?.hostUser).toBe(user.id);
  });
});
