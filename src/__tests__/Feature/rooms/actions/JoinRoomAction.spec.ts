import 'reflect-metadata';
import { Not, getCustomRepository, In } from 'typeorm';
import {
  useSeeding,
  runSeeder,
  tearDownDatabase,
  factory,
} from 'typeorm-seeding';
import CreateRoomsSeeder from '@database/seeds/CreateRoomsSeeder';
import JoinRoomAction from '@modules/rooms/actions/JoinRoomAction';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import RoomRepository from '@modules/rooms/repositories/RoomRepository';

import User from '@modules/users/entities/User';
import ServerFactory from '../../../../server';

describe('JoinRoomAction', () => {
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

  it('should be register a user in participants table', async () => {
    const userRepository = getCustomRepository(UsersRepository);
    const roomRepository = getCustomRepository(RoomRepository);
    const action = new JoinRoomAction();
    const rooms = await roomRepository.find();
    const user = await factory(User)().create();
    await action.execute({
      roomId: rooms[0]?.id as string,
      userId: user.id,
    });
    const userWithRoom = await userRepository.findOne(user.id, {
      relations: ['rooms'],
    });
    expect(userWithRoom).not.toBeNull();
    expect(userWithRoom?.rooms).toHaveLength(1);
  });
});
