import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTableRoomParticipants1596240818197
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'room_participants',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'room_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('room_participants');
  }
}
