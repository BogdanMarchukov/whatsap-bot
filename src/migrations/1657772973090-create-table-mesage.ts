import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMesage1657772973090 implements MigrationInterface {
    name = 'createTableMesage1657772973090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messege" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "imageUrl" character varying, "text" character varying NOT NULL, "when" TIMESTAMP WITH TIME ZONE NOT NULL, "groupId" uuid NOT NULL, "userBotId" uuid, CONSTRAINT "PK_f6e584086be495cf7307e18c3d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messege" ADD CONSTRAINT "FK_e09b16769d6d4539ff22a71a45c" FOREIGN KEY ("userBotId") REFERENCES "user_bot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messege" DROP CONSTRAINT "FK_e09b16769d6d4539ff22a71a45c"`);
        await queryRunner.query(`DROP TABLE "messege"`);
    }

}
