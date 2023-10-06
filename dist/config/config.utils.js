"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAWSConfigFromEnv = exports.parseEncryptionKeyFromEnv = exports.parseJWTConfigFromEnv = exports.parseMongoDBConnectionConfigFromEnv = exports.validateEnvVariables = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const config_errors_1 = require("./config.errors");
const validateEnvVariables = (EnvironmentVariables, config) => {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
exports.validateEnvVariables = validateEnvVariables;
const parseMongoDBConnectionConfigFromEnv = () => {
    if (!process.env['DATABASE_HOST'] ||
        !process.env['DATABASE_PORT'] ||
        !process.env['DATABASE_USERNAME'] ||
        !process.env['DATABASE_PASSWORD'] ||
        !process.env['DATABASE_NAME']) {
        throw new Error(config_errors_1.MISSING_MY_SQL_ENV_VARIABLES);
    }
    return {
        host: process.env['DATABASE_HOST'],
        port: parseInt(process.env['DATABASE_PORT'], 10),
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
        database: process.env['DATABASE_NAME'],
    };
};
exports.parseMongoDBConnectionConfigFromEnv = parseMongoDBConnectionConfigFromEnv;
const parseJWTConfigFromEnv = () => {
    if (!process.env['JWT_SECRET'] || !process.env['JWT_EXPIRY']) {
        throw new Error(config_errors_1.MISSING_JWT_ENV_VARIABLES);
    }
    return {
        secret: process.env['JWT_SECRET'],
        expiry: process.env['JWT_EXPIRY'],
    };
};
exports.parseJWTConfigFromEnv = parseJWTConfigFromEnv;
const parseEncryptionKeyFromEnv = () => {
    if (!process.env['ENCRYPTION_KEY']) {
        throw new Error(config_errors_1.MISSING_ENCRYPTION_KEY_ENV_VARIABLES);
    }
    return process.env['ENCRYPTION_KEY'];
};
exports.parseEncryptionKeyFromEnv = parseEncryptionKeyFromEnv;
const parseAWSConfigFromEnv = () => {
    if (!process.env['AWS_ACCESS_KEY_ID'] ||
        !process.env['AWS_SECRET_ACCESS_KEY']) {
        throw new Error(config_errors_1.MISSING_AWS_ENV_VARIABLES);
    }
    return {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    };
};
exports.parseAWSConfigFromEnv = parseAWSConfigFromEnv;
//# sourceMappingURL=config.utils.js.map