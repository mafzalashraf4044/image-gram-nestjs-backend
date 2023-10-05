import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import UsersModule from '@modules/user/user.module';
import AuthenticationController from './authentication.controller';
import AuthenticationService from './authentication.service';
import AuthenticationGuard from './authentication.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiry') },
      }),
      inject: [ConfigService], // Inject the ConfigService
    }),
  ],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export default class AuthenticationModule {}
