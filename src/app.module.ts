import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { MongooseConfigService } from '@database/database.service';
import { ConfigModule } from '@config/config.module';
import PostModule from '@modules/post/post.module';
import CommentModule from '@modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule,
    PostModule,
    CommentModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
