import Faker from 'faker';
import { define } from 'typeorm-seeding';
import User from '@modules/users/entities/User';

define(User, (faker: typeof Faker) => {
  const username = faker.internet.userName();
  const password = '12345678';
  const mobileToken = faker.random.uuid().substr(0, 6);

  const user = new User();
  user.username = username;
  // user.password = faker.random.word();
  user.password = password;
  user.mobileToken = mobileToken;
  return user;
});
