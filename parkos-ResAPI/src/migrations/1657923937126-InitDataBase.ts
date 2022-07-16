import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDataBase1657923937126 implements MigrationInterface {
    name = 'InitDataBase1657923937126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservations\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`arrivalDate\` timestamp NOT NULL, \`arrivalTime\` time NOT NULL, \`departureDate\` timestamp NOT NULL, \`departureTime\` time NOT NULL, \`status\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP(), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reservations\``);
    }

}
