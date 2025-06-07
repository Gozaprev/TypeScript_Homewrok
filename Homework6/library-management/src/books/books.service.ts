// Old:
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class BooksService {}


import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { Category } from '../categories/entity/category.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async findAll(query: any) {
        const qb = this.bookRepository.createQueryBuilder('book').leftJoinAndSelect('book.category', 'category');

        if (query.category) qb.andWhere('book.category = :category', { category: query.category });
        if (query.author) qb.andWhere('book.author ILIKE :author', { author: `%${query.author}%` });
        if (query.available !== undefined)
            qb.andWhere('book.available = :available', { available: query.available === 'true' });

        if (query.sortBy) {
            const order = query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            if (['title', 'author', 'publicationYear'].includes(query.sortBy))
                qb.orderBy(`book.${query.sortBy}`, order);
        }

        return qb.getMany();
    }

    async findOne(id: number) {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ['category'] });
        if (!book) throw new NotFoundException('Book not found');
        return book;
    }

    async create(dto: CreateBookDto) {
        const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
        if (!category) throw new BadRequestException('Invalid category');

        try {
            const book = this.bookRepository.create({ ...dto, category });
            return await this.bookRepository.save(book);
        } catch (err) {
            throw new BadRequestException('ISBN must be unique');
        }
    }

    async update(id: number, dto: UpdateBookDto) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) throw new NotFoundException('Book not found');

        if (dto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
            if (!category) throw new BadRequestException('Invalid category');
            book.category = category;
        }
        Object.assign(book, dto);
        return this.bookRepository.save(book);
    }

    async remove(id: number) {
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Book not found');
        return { deleted: true };
    }
}
