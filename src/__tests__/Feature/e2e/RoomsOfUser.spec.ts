import 'reflect-metadata';
import 'jest-extended';
import { useSeeding, factory } from 'typeorm-seeding';
import { getCustomRepository } from 'typeorm';
import supertest from 'supertest';
import User from '@modules/users/entities/User';
import TokenService from '@modules/users/services/tokenService';
import Room from '@modules/rooms/entities/Room';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import RoomParticipantRepository from '@modules/rooms/repositories/RoomParticipantRepository';
import RoomParticipant from '@modules/rooms/entities/RoomParticipant';
import { startTestServer } from '../../__utils';
import ServerFactory from '../../../server';

describe('Rooms Join and Leave - e2e', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let rooms: any;
  let users: User[];
  let tokenService: TokenService;

  beforeAll(async done => {
    await useSeeding({ connection: 'test' });
    await ServerFactory.connectionPGCreate();
    rooms = await factory(Room)().createMany(5);
    tokenService = new TokenService();
    request = await startTestServer();
    done();
  });

  afterAll(async done => {
    await ServerFactory.connectionPGClose();
    done();
  });

  it('Rooms of a User by username', async done => {
    expect.assertions(2);
    const userRepository = getCustomRepository(UsersRepository);

    const roomParticipantRepository = getCustomRepository(
      RoomParticipantRepository,
    );
    const user = await factory(User)().create();

    await roomParticipantRepository
      .createQueryBuilder()
      .insert()
      .into(RoomParticipant)
      .values([
        {
          userId: user.id,
          roomId: rooms[0].id,
        },
        {
          userId: user.id,
          roomId: rooms[2].id,
        },
      ])
      .execute();

    const response = await request.get(`/users/${user.username}/rooms`);
    const userWithRooms = await userRepository.findOne(user.id, {
      relations: ['rooms'],
    });

    expect(response.status).toBe(200);
    expect(userWithRooms?.rooms).toHaveLength(2);
    done();
  });

  it('it should return 404', async done => {
    expect.assertions(1);
    const response = await request.get(`/users/__test__/rooms`);

    expect(response.status).toBe(404);

    done();
  });
});
