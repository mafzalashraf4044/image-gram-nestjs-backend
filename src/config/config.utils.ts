import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

import { MongoDBConnectionConfig, AWSConfig } from '@common/interfaces';

import { EnvironmentVariablesInterface, JWTConfig } from './config.interface';
import {
  MISSING_MY_SQL_ENV_VARIABLES,
  MISSING_JWT_ENV_VARIABLES,
  MISSING_ENCRYPTION_KEY_ENV_VARIABLES,
  MISSING_AWS_ENV_VARIABLES,
} from './config.errors';

export const validateEnvVariables = <T extends EnvironmentVariablesInterface>(
  EnvironmentVariables: ClassConstructor<T>,
  config: Record<string, unknown>,
) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export const parseMongoDBConnectionConfigFromEnv =
  (): MongoDBConnectionConfig => {
    if (
      !process.env['DATABASE_HOST'] ||
      !process.env['DATABASE_PORT'] ||
      !process.env['DATABASE_USERNAME'] ||
      !process.env['DATABASE_PASSWORD'] ||
      !process.env['DATABASE_NAME']
    ) {
      throw new Error(MISSING_MY_SQL_ENV_VARIABLES);
    }

    return {
      host: process.env['DATABASE_HOST'],
      port: parseInt(process.env['DATABASE_PORT'], 10),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
    };
  };

export const parseJWTConfigFromEnv = (): JWTConfig => {
  if (!process.env['JWT_SECRET'] || !process.env['JWT_EXPIRY']) {
    throw new Error(MISSING_JWT_ENV_VARIABLES);
  }

  return {
    secret: process.env['JWT_SECRET'],
    expiry: process.env['JWT_EXPIRY'],
  };
};

export const parseEncryptionKeyFromEnv = (): string => {
  if (!process.env['ENCRYPTION_KEY']) {
    throw new Error(MISSING_ENCRYPTION_KEY_ENV_VARIABLES);
  }

  return process.env['ENCRYPTION_KEY'];
};

export const parseAWSConfigFromEnv = (): AWSConfig => {
  if (
    !process.env['AWS_ACCESS_KEY_ID'] ||
    !process.env['AWS_SECRET_ACCESS_KEY']
  ) {
    throw new Error(MISSING_AWS_ENV_VARIABLES);
  }

  return {
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  };
};
