import {MigrationInterface, QueryRunner} from "typeorm";

export class init1652038664541 implements MigrationInterface {
    name = 'init1652038664541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_bot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "idInstance" character varying NOT NULL, "apiTokenInstance" character varying NOT NULL, "name" character varying NOT NULL, "channelID" character varying NOT NULL, "removed" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_a5e381d522bab84ad9b48f37831" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_bot"`);
    }

}
