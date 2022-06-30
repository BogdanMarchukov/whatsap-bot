import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableGroup1656561258654 implements MigrationInterface {
    name = 'addTableGroup1656561258654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "groupId" character varying NOT NULL, "groupName" character varying NOT NULL, "removed" TIMESTAMP WITH TIME ZONE, "userBotId" uuid, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_36952d3cea3f08ae840aa2bad5a" FOREIGN KEY ("userBotId") REFERENCES "user_bot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_36952d3cea3f08ae840aa2bad5a"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
