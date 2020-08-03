import 'reflect-metadata';
import 'jest-extended';
import { useSeeding, factory } from 'typeorm-seeding';
import supertest from 'supertest';
import User from '@modules/users/entities/User';
import TokenService from '@modules/users/services/tokenService';
import { startTestServer } from '../../__utils';
import ServerFactory from '../../../server';

describe('UserDelete - e2e', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let users: User[];
  let tokenService: TokenService;

  beforeAll(async done => {
    await useSeeding({ connection: 'test' });
    await ServerFactory.connectionPGCreate();
    users = await factory(User)().createMany(5, { password: '654321' });
    request = await startTestServer();
    tokenService = new TokenService();
    done();
  });

  afterAll(async done => {
    await ServerFactory.connectionPGClose();
    done();
  });

  it('should delete logged user', async done => {
    // expect.assertions(3);
    let response;

    const token = tokenService.generate(users[0].id);

    response = await request
      .delete('/users')
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);

    response = await request.post('/authenticate').send({
      username: users[0].username,
      password: '654321',
    });
    expect(response.status).toBe(401);
    done();
  });
});
