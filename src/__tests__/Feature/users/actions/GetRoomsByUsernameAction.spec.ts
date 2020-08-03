import 'reflect-metadata';
import { useSeeding, runSeeder, tearDownDatabase } from 'typeorm-seeding';
import CreateRoomsSeeder from '@database/seeds/CreateRoomsSeeder';
import GetRoomsByUsernameAction from '@modules/users/actions/GetRoomsByUsernameAction';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import ServerFactory from '../../../../server';

describe('GetRoomsByUsernameAction', () => {
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
    const action = new GetRoomsByUsernameAction();
    const users = await userRepository.find({ relations: ['rooms'] });
    const usersWithRooms = users.filter(user => user.rooms.length > 0);
    const user =
      usersWithRooms[Math.floor(Math.random() * usersWithRooms.length)];

    const userFound = await action.execute({ username: user.username });

    expect(userFound).not.toBeNull();
    expect(userFound).toHaveLength(1);
  });
});
