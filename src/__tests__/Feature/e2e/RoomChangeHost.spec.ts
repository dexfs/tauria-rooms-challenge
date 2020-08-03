import 'reflect-metadata';
import 'jest-extended';
import { useSeeding, factory } from 'typeorm-seeding';
import supertest from 'supertest';
import User from '@modules/users/entities/User';
import TokenService from '@modules/users/services/tokenService';
import Room from '@modules/rooms/entities/Room';
import { startTestServer } from '../../__utils';
import ServerFactory from '../../../server';

describe('Rooms - e2e', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let rooms: any;
  let users: User[];
  let tokenService: TokenService;

  beforeAll(async done => {
    await useSeeding({ connection: 'test' });
    await ServerFactory.connectionPGCreate();
    rooms = await factory(Room)().createMany(5);
    users = await factory(User)().createMany(2);
    tokenService = new TokenService();
    request = await startTestServer();
    done();
  });

  afterAll(async done => {
    await ServerFactory.connectionPGClose();
    done();
  });

  it('Change Host Room', async done => {
    expect.assertions(2);
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const token = tokenService.generate(room.hostUser?.id);

    const response = await request
      .put(`/rooms/change-room-host`)
      .set('Authorization', `bearer ${token}`)
      .send({
        roomId: room.id,
        newHost: user.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.hostUser).toBe(user?.id);
    done();
  });

  it('Change Host Room 400 if the same user was sent', async done => {
    expect.assertions(1);
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    const token = tokenService.generate(room.hostUser?.id);

    const response = await request
      .put(`/rooms/change-room-host`)
      .set('Authorization', `bearer ${token}`)
      .send({
        roomId: room.id,
        newHost: room.hostUser?.id,
      });

    expect(response.status).toBe(400);
    done();
  });

  it('returns 400 when invalid uuid is sent', async done => {
    expect.assertions(1);
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    const token = tokenService.generate(room.hostUser?.id);

    const response = await request
      .put(`/rooms/change-room-host`)
      .set('Authorization', `bearer ${token}`)
      .send({
        roomId: '1',
        newHost: '1',
      });

    expect(response.status).toBe(400);
    done();
  });
});
