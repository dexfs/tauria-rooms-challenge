import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class addFkHostUserRoomsTable1596240708918
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'rooms',
      new TableForeignKey({
        name: 'HostUser',
        columnNames: ['host_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rooms', 'HostUser');
  }
}
