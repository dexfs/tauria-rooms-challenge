import 'reflect-metadata';
import 'jest-extended';
import { useSeeding, factory } from 'typeorm-seeding';
import supertest from 'supertest';
import User from '@modules/users/entities/User';
import { startTestServer } from '../../__utils';
import ServerFactory from '../../../server';

describe('Auth - e2e', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let users: User[];

  beforeAll(async done => {
    await useSeeding({ connection: 'test' });
    await ServerFactory.connectionPGCreate();
    users = await factory(User)().createMany(5, { password: '654321' });
    request = await startTestServer();
    done();
  });

  afterAll(async done => {
    await ServerFactory.connectionPGClose();
    done();
  });

  test('SignIn - Valid', async done => {
    expect.assertions(2);

    const response = await request.post('/authenticate').send({
      username: users[0].username,
      password: '654321',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: {
          id: expect.any(String),
          username: expect.any(String),
        },
        token: expect.any(String),
      }),
    );
    done();
  });

  test('SignIn - Invalid', async done => {
    expect.assertions(1);

    const response = await request.post('/authenticate').send({
      username: users[0].username,
      password: '65432',
    });
    expect(response.status).toBe(401);
    done();
  });
});
