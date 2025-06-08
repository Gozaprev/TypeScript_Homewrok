// Old code:

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





// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { RoomsModule } from './rooms/rooms.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'postgres',
//       database: 'hotel_booking',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true, // only for dev, auto-sync schema
//     }),
//     RoomsModule,
//   ],
// })
// export class AppModule { }


// Corrected code:

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available app-wide
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // only for dev
      }),
    }),
    RoomsModule,
  ],
})
export class AppModule { }
