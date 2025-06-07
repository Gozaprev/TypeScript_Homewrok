// Old:
// import { Controller } from '@nestjs/common';

// @Controller('categories')
// export class CategoriesController {}


// Code without auth:

// import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
// import { CategoriesService } from './categories.service';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

// @Controller('categories')
// export class CategoriesController {
//     constructor(private readonly categoriesService: CategoriesService) { }

//     @Get()
//     findAll() {
//         return this.categoriesService.findAll();
//     }

//     @Get(':id')
//     findOne(@Param('id', ParseIntPipe) id: number) {
//         return this.categoriesService.findOne(id);
//     }

//     @Post()
//     create(@Body() dto: CreateCategoryDto) {
//         return this.categoriesService.create(dto);
//     }

//     @Put(':id')
//     update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
//         return this.categoriesService.update(id, dto);
//     }

//     @Delete(':id')
//     remove(@Param('id', ParseIntPipe) id: number) {
//         return this.categoriesService.remove(id);
//     }
// }


// Code with auth:

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    // Public endpoints
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    // Protected endpoints
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
        return this.categoriesService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(id);
    }
}
