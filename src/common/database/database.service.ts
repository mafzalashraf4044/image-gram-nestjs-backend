/** @format */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { MongoDBConnectionConfig } from '@common/interfaces';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private config: MongoDBConnectionConfig;

  constructor(private configService: ConfigService) {
    this.config = {
      host: this.configService.get('db.host'),
      port: this.configService.get('db.port'),
      username: this.configService.get('db.username'),
      password: this.configService.get('db.password'),
      database: this.configService.get('db.database'),
    };
  }

  createMongooseOptions(): MongooseModuleOptions {
    const { host, port, username, password, database } = this.config;
    const uri = `mongodb://${username}:${password}@${host}:${port}/`;

    return {
      uri,
      dbName: database,
    };
  }
}
