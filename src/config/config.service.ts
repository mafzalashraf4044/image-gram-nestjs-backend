import {
  parseMongoDBConnectionConfigFromEnv,
  parseJWTConfigFromEnv,
  parseEncryptionKeyFromEnv,
  parseAWSConfigFromEnv,
} from '@common/utils';
import { Config } from '@common/interfaces';

export default async (): Promise<Config> => {
  return {
    port: parseInt(process.env.PORT, 10),
    db: parseMongoDBConnectionConfigFromEnv(),
    jwt: parseJWTConfigFromEnv(),
    encryptionKey: parseEncryptionKeyFromEnv(),
    aws: parseAWSConfigFromEnv(),
  };
};
