// Old:

// import { Controller } from '@nestjs/common';

// @Controller('books')
// export class BooksController {}

// COde without auth:


// import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
// import { BooksService } from './books.service';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';

// @Controller('books')
// export class BooksController {
//     constructor(private readonly booksService: BooksService) { }

//     @Get()
//     findAll(@Query() query) {
//         return this.booksService.findAll(query);
//     }

//     @Get(':id')
//     findOne(@Param('id', ParseIntPipe) id: number) {
//         return this.booksService.findOne(id);
//     }

//     @Post()
//     create(@Body() dto: CreateBookDto) {
//         return this.booksService.create(dto);
//     }

//     @Put(':id')
//     update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
//         return this.booksService.update(id, dto);
//     }

//     @Delete(':id')
//     remove(@Param('id', ParseIntPipe) id: number) {
//         return this.booksService.remove(id);
//     }
// }


// COde with auth

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    // Public endpoints
    @Get()
    findAll(@Query() query) {
        return this.booksService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.findOne(id);
    }

    // Protected endpoints
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateBookDto) {
        return this.booksService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
        return this.booksService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.remove(id);
    }
}

