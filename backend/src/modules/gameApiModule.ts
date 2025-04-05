import {Module} from "@nestjs/common";
import {GameApiController} from "../controllers/gameApiController";
import {GameService} from "../services/gameService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GameEntity} from "../entities/game.entity";

@Module( {
    imports: [TypeOrmModule.forFeature([GameEntity])],
    controllers: [GameApiController],
    providers: [GameService]
} )

export class GameApiModule {}