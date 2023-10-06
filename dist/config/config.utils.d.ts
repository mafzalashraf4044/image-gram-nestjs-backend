import { ClassConstructor } from 'class-transformer';
import { MongoDBConnectionConfig, AWSConfig } from '@common/interfaces';
import { EnvironmentVariablesInterface, JWTConfig } from './config.interface';
export declare const validateEnvVariables: <T extends EnvironmentVariablesInterface>(EnvironmentVariables: ClassConstructor<T>, config: Record<string, unknown>) => T;
export declare const parseMongoDBConnectionConfigFromEnv: () => MongoDBConnectionConfig;
export declare const parseJWTConfigFromEnv: () => JWTConfig;
export declare const parseEncryptionKeyFromEnv: () => string;
export declare const parseAWSConfigFromEnv: () => AWSConfig;
