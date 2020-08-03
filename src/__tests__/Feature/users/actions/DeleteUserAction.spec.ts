import 'reflect-metadata';
import { useSeeding, runSeeder, tearDownDatabase } from 'typeorm-seeding';
import CreateUsersSeeder from '@database/seeds/CreateUsersSeeder';
import DeleteUserAction from '@modules/users/actions/DeleteUserAction';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import ServerFactory from '../../../../server';

describe('DeleteUserAction', () => {
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

  it('should delete an user passed', async () => {
    const userRepository = getCustomRepository(UsersRepository);
    const action = new DeleteUserAction();
    const users = await userRepository.find();
    const user = users[Math.floor(Math.random() * users.length)];
    await action.execute({ id: user.id });
    const userNotFound = await userRepository.findOne({ id: user.id });
    const usersCount = await userRepository.count();

    expect(userNotFound).toBeUndefined();
    expect(usersCount).toBe(4);
  });

  it('should throw an error when invalid uuid passed', async () => {
    const action = new DeleteUserAction();
    await expect(action.execute({ id: '1' })).toBeTruthy();
  });
});
