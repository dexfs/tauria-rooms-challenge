import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '@modules/users/entities/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(User).execute();
    await factory(User)().createMany(5);
  }
}
