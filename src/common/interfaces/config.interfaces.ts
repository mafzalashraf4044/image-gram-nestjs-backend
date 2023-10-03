export interface EnvironmentVariablesInterface {
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
}

export interface MongoDBConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface Config {
  port: number;

  /** Database connection details. */
  db: MongoDBConnectionConfig;
}
