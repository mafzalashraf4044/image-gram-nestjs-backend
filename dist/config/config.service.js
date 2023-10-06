"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_utils_1 = require("./config.utils");
exports.default = async () => {
    return {
        port: parseInt(process.env.PORT, 10),
        db: (0, config_utils_1.parseMongoDBConnectionConfigFromEnv)(),
        jwt: (0, config_utils_1.parseJWTConfigFromEnv)(),
        encryptionKey: (0, config_utils_1.parseEncryptionKeyFromEnv)(),
        aws: (0, config_utils_1.parseAWSConfigFromEnv)(),
    };
};
//# sourceMappingURL=config.service.js.map