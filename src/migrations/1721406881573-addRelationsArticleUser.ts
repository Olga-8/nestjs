import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsArticleUser1721406881573 implements MigrationInterface {
    name = 'AddRelationsArticleUser1721406881573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', \`body\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`tagList\` text NOT NULL, \`favoritesCount\` int NOT NULL DEFAULT '0', \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_65d9ccc1b02f4d904e90bd76a34\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_65d9ccc1b02f4d904e90bd76a34\``);
        await queryRunner.query(`DROP TABLE \`articles\``);
    }

}
