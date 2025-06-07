// Old:
// import { Module } from '@nestjs/common';
// import { BooksController } from './books.controller';
// import { BooksService } from './books.service';

// @Module({
//   controllers: [BooksController],
//   providers: [BooksService]
// })
// export class BooksModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Category } from '../categories/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule { }
