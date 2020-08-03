import 'reflect-metadata';
import CreateUserAction from '@modules/users/actions/CreateUserAction';
import ServerFactory from '../../../../server';

describe('CreateUserAction', () => {
  beforeAll(async () => {
    await ServerFactory.connectionPGCreate();
  });

  afterAll(async () => {
    await ServerFactory.connectionPGClose();
  });

  it('should create an user and return user and token', async () => {
    const action = new CreateUserAction();
    const result = await action.execute({
      username: '__TEST__',
      password: '123456',
    });

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
    expect(result.user).not.toBeNull();
    expect(result.user).not.toHaveProperty('password');
    expect(result.token).not.toBeNull();
  });

  it('should return and error if invalid data passed', async () => {
    const action = new CreateUserAction();
    const data = { username: '', password: '' };
    await expect(action.execute(data)).rejects.toBeTruthy();
  });
});
