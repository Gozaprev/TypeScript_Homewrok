import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Category } from '../../categories/entity/category.entity';

@Entity()
@Unique(['isbn'])
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publicationYear: number;

    @Column()
    isbn: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: true })
    available: boolean;

    @ManyToOne(() => Category, category => category.books, { eager: true })
    category: Category;
}
