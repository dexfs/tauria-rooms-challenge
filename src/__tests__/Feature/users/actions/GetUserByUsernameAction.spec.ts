import 'reflect-metadata';
import { useSeeding, runSeeder, tearDownDatabase } from 'typeorm-seeding';
import CreateUsersSeeder from '@database/seeds/CreateUsersSeeder';
import GetUserByUsername from '@modules/users/actions/GetUserByUsername';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import ServerFactory from '../../../../server';

describe('GetUserByUsernameAction', () => {
  beforeAll(async done => {
    await ServerFactory.connectionPGCreate();
    await useSeeding({ connection: 'test' });
    done();
  });
  beforeEach(async done => {
    await runSeeder(CreateUsersSeeder);
    done();
  });

  afterAll(async done => {
    await tearDownDatabase();
    done();
  });

  it('should return user by username', async () => {
    const userRepository = getCustomRepository(UsersRepository);
    const action = new GetUserByUsername();
    const users = await userRepository.find();
    const user = users[Math.floor(Math.random() * users.length)];
    const userFound = await action.execute({ username: user.username });

    expect(userFound).not.toBeNull();
    expect(userFound?.username).toEqual(user.username);
  });
});
