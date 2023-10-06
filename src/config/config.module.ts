// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import configuration from './config.service';
import EnvironmentVariables from './config.validator';
import { validateEnvVariables } from './config.utils';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        return validateEnvVariables(EnvironmentVariables, config);
      },
      load: [() => configuration()],
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
