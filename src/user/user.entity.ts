import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ArticleEntity } from "@app/article/article.entity";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: "user" })
    role: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => ArticleEntity, article => article.author)
    articles: ArticleEntity[];

}