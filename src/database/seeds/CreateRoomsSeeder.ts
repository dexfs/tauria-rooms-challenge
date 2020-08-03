import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Room from '@modules/rooms/entities/Room';
import RoomParticipant from '@modules/rooms/entities/RoomParticipant';
import User from '@modules/users/entities/User';

export default class CreateRoomsAndUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(User).execute();
    await connection.createQueryBuilder().delete().from(Room).execute();
    const rooms = await factory(Room)().createMany(5);
    const noHostUsers = await factory(User)().createMany(2);
    await connection
      .createQueryBuilder()
      .insert()
      .into(RoomParticipant)
      .values([
        { userId: noHostUsers[0].id, roomId: rooms[0].id },
        { userId: noHostUsers[1].id, roomId: rooms[2].id },
      ])
      .execute();
  }
}
