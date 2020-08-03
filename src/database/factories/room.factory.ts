import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import Room from '@modules/rooms/entities/Room';
import User from '@modules/users/entities/User';

define(Room, (faker: typeof Faker) => {
  const room = new Room();
  room.id = faker.random.uuid();
  room.name = faker.name.title();
  room.hostUser = factory(User)() as any;
  room.capacityLimit = faker.random.number({ min: 5, max: 100 });
  return room;
});
