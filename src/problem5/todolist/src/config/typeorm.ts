import { config as dotenvConfig } from 'dotenv';
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || "5432", 10),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: [join(__dirname, '/../models/*.entity{.ts,.js}')], // Handles src and dist paths
    migrations: [join(__dirname, '/../database/migrations/**/*{.ts,.js}')],
    synchronize: false,
    logging: true,
}

export const connectionSource = new DataSource(config);