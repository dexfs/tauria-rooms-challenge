import { define } from 'typeorm-seeding';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import CreateUserAction from '@modules/users/actions/CreateUserAction';

beforeAll(async done => {
  await createConnection();
  done();
});
describe('CreateUserAction', () => {
  test('Teste', async () => {
    const action = new CreateUserAction();
    const user = await action.execute({
      username: '__TEST__',
      password: '123456',
    });
    expect(user).not.toBeNull();
  });
});
