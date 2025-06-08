import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommonService } from './common/common.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, PostsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
