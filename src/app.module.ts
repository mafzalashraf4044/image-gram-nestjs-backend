import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';
import PostModule from '@modules/post/post.module';

@Module({
  imports: [
    ConfigModule,
    KafkaModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
