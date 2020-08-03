import 'reflect-metadata';
import 'jest-extended';
import { getCustomRepository } from 'typeorm';
import { useSeeding, factory } from 'typeorm-seeding';
import supertest from 'supertest';
import faker from 'faker';
import User from '@modules/users/entities/User';
import TokenService from '@modules/users/services/tokenService';
import Room from '@modules/rooms/entities/Room';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import { startTestServer } from '../../__utils';
import ServerFactory from '../../../server';

describe('Rooms - e2e', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let rooms: Room[];

  beforeAll(async done => {
    await useSeeding({ connection: 'test' });
    await ServerFactory.connectionPGCreate();
    rooms = await factory(Room)().createMany(5);

    request = await startTestServer();
    done();
  });

  afterAll(async done => {
    await ServerFactory.connectionPGClose();
    done();
  });

  it('Get Room Info', async done => {
    expect.assertions(2);

    const response = await request.get(`/rooms/${rooms[0].id}/info`);
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne(response.body.hostUser, {
      relations: ['hostRooms'],
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user?.hostRooms[0].id);
    done();
  });

  it('Get Room Info - should return 404 when not found id', async done => {
    expect.assertions(1);

    const response = await request.get(`/rooms/${faker.random.uuid()}/info`);

    expect(response.status).toBe(404);
    done();
  });

  it('Get Room Info - should return 400 invalid uuid passed', async done => {
    expect.assertions(1);

    const response = await request.get(`/rooms/1/info`);

    expect(response.status).toBe(400);
    done();
  });
});
