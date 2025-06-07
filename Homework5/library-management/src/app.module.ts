// Old:

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CategoriesModule } from './categories/categories.module';
// import { BooksModule } from './books/books.module';

// @Module({
//   imports: [CategoriesModule, BooksModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { Category } from './categories/entity/category.entity';
import { Book } from './books/entity/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env variables globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT', '5432'), 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Category, Book],
        synchronize: config.get('TYPEORM_SYNCHRONIZE') === 'true',
      }),
    }),
    CategoriesModule,
    BooksModule,
  ],
})
export class AppModule { }

