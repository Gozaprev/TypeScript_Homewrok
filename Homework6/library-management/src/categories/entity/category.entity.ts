import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Book } from '../../books/entity/book.entity';

@Entity()
@Unique(['name'])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => Book, book => book.category)
    books: Book[];
}
