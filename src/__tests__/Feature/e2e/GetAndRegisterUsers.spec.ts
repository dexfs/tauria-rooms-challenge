import 'reflect-metadata';
import 'jest-extended';
import { useSeeding, factory } from 'typeorm-seeding';
import supertest from 'supertest';
import User from '@modules/users/entities/User';
import { startTestServer } from '../../__utils';
import ServerFactory from '../../../server';

describe('Users - e2e', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let users: User[];

  beforeAll(async done => {
    await useSeeding({ connection: 'test' });
    await ServerFactory.connectionPGCreate();
    users = await factory(User)().createMany(10);
    request = await startTestServer();
    done();
  });

  afterAll(async done => {
    await ServerFactory.connectionPGClose();
    done();
  });

  it('should return list of users', async () => {
    expect.assertions(2);

    const response = await request.get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.toContainAllKeys([
          'id',
          'username',
          'mobileToken',
          'createdAt',
          'updatedAt',
        ]),
      ]),
    );
  });

  it('should return a user by username', async done => {
    expect.assertions(3);
    const response = await request.get(`/users/${users[0]?.username}`);
    expect(response.status).toBe(200);
    expect(response.body).toContainAllKeys([
      'id',
      'username',
      'mobileToken',
      'createdAt',
      'updatedAt',
    ]);
    expect(response.body.username).toBe(users[0]?.username);
    done();
  });

  it('should register an user', async done => {
    expect.assertions(2);
    const user = await factory(User)().make({ password: '654321' });

    const response = await request.post(`/users/register`).send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: {
          id: expect.any(String),
          username: expect.any(String),
          mobileToken: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        token: expect.any(String),
      }),
    );
    done();
  });
});
