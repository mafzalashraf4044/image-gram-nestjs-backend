import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class MongooseConfigService implements MongooseOptionsFactory {
    private configService;
    private config;
    constructor(configService: ConfigService);
    createMongooseOptions(): MongooseModuleOptions;
}
