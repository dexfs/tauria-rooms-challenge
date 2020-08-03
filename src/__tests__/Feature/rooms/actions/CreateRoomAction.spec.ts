import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';
import { useSeeding, runSeeder, tearDownDatabase } from 'typeorm-seeding';
import CreateRoomsSeeder from '@database/seeds/CreateRoomsSeeder';
import CreateRoomAction from '@modules/rooms/actions/CreateRoomAction';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import ServerFactory from '../../../../server';

describe('CreateRoomAction', () => {
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

  it('should create a room with a user host', async () => {
    const userRepository = getCustomRepository(UsersRepository);
    const action = new CreateRoomAction();

    const user = await userRepository.findOne();
    const room = await action.execute({
      name: 'TEST_ROOM',
      hostUser: user?.id as string,
      capacityLimit: 150,
    });
    expect(room).not.toBeNull();
    expect(room?.name).toBe('TEST_ROOM');
    expect(room?.hostUser).toBe(user?.id);
    expect(room?.capacityLimit).toBe(150);
  });
});
