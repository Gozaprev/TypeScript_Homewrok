// Old:
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class CategoriesService {}


import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    findAll() {
        return this.categoryRepository.find();
    }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['books'],
        });
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    async create(dto: CreateCategoryDto) {
        try {
            const category = this.categoryRepository.create(dto);
            return await this.categoryRepository.save(category);
        } catch (err) {
            throw new BadRequestException('Category name must be unique');
        }
    }

    async update(id: number, dto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');
        Object.assign(category, dto);
        return this.categoryRepository.save(category);
    }

    async remove(id: number) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Category not found');
        return { deleted: true };
    }
}
