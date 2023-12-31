import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { MongooseConfigService } from '@common/database/database.service';
import { ConfigModule } from '@config/config.module';
import AuthenticationModule from '@modules/authentication/authentication.module';
import UserModule from '@modules/user/user.module';
import PostModule from '@modules/post/post.module';
import CommentModule from '@modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
    UserModule,
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
