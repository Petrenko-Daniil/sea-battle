import {TypeOrmModule} from "@nestjs/typeorm";
import {GameEntity} from "../entities/game.entity";

export const databaseConnection = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
    entities: [GameEntity],
    synchronize: true
})