// Old:
// import { Module } from '@nestjs/common';
// import { UsresService } from './usres.service';

// @Module({
//   providers: [UsresService]
// })
// export class UsresModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './usres.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
