import {MigrationInterface, QueryRunner} from "typeorm";

export class edit1652042191876 implements MigrationInterface {
    name = 'edit1652042191876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bot" RENAME COLUMN "channelID" TO "chatId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bot" RENAME COLUMN "chatId" TO "channelID"`);
    }

}
