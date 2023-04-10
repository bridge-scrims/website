import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkingRequests1680959866785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "linking_request" (
                "code" text NOT NULL,
                "user_id" bigint NOT NULL,
                "expiration" TIMESTAMP NOT NULL DEFAULT (now() + '5 minutes'::interval),
                CONSTRAINT "PK_8a683ce105d0d788ba74a4d99cd" PRIMARY KEY ("code")
            )
        `);
        await queryRunner.query(`
            CREATE SEQUENCE linking_request_index MAXVALUE 999 CYCLE;
        `);
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION remove_expired_linking_requests() 
            RETURNS VOID AS $$
            BEGIN
                DELETE FROM linking_request WHERE is_expired(expiration);
            END
            $$ LANGUAGE plpgsql;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "linking_request"`);
        await queryRunner.query(`DROP FUNCTION remove_expired_linking_requests`);
    }
}
