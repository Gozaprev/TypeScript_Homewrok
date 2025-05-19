// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { RoomsModule } from './rooms/rooms.module';
// import { RoomsController } from './rooms/rooms.controller';
// import { RoomsService } from './rooms/rooms.service';

// @Module({
//   imports: [RoomsModule, RoomsController, RoomsService],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }





import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hotel_booking',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // only for dev, auto-sync schema
    }),
    RoomsModule,
  ],
})
export class AppModule { }
