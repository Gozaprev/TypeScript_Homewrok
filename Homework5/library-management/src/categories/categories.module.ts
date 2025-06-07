// Old:
// import { Module } from '@nestjs/common';
// import { CategoriesController } from './categories.controller';
// import { CategoriesService } from './categories.service';

// @Module({
//   controllers: [CategoriesController],
//   providers: [CategoriesService]
// })
// export class CategoriesModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule { }
