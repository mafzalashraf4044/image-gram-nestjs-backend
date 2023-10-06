import {
  parseMongoDBConnectionConfigFromEnv,
  parseJWTConfigFromEnv,
  parseEncryptionKeyFromEnv,
  parseAWSConfigFromEnv,
} from './config.utils';
import { Config } from './config.interface';

export default async (): Promise<Config> => {
  return {
    port: parseInt(process.env.PORT, 10),
    db: parseMongoDBConnectionConfigFromEnv(),
    jwt: parseJWTConfigFromEnv(),
    encryptionKey: parseEncryptionKeyFromEnv(),
    aws: parseAWSConfigFromEnv(),
  };
};
