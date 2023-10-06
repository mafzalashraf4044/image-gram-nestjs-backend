import { MongoDBConnectionConfig, AWSConfig } from '@common/interfaces';
export interface EnvironmentVariablesInterface {
    PORT: number;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    ENCRYPTION_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
}
export interface JWTConfig {
    secret: string;
    expiry: string;
}
export interface Config {
    port: number;
    db: MongoDBConnectionConfig;
    jwt: JWTConfig;
    encryptionKey: string;
    aws: AWSConfig;
}
