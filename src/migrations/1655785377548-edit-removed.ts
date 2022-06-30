import {MigrationInterface, QueryRunner} from "typeorm";

export class editRemoved1655785377548 implements MigrationInterface {
    name = 'editRemoved1655785377548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bot" ALTER COLUMN "removed" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bot" ALTER COLUMN "removed" SET NOT NULL`);
    }

}
