import {DataSource} from "typeorm";
import {Games} from "../entities/games.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
    entities: [Games],
    synchronize: true,
    logging: false
})