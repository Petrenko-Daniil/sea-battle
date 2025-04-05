import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {GameEntity} from "../entities/game.entity";
import {Repository} from "typeorm";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(GameEntity)
        private gameRepository: Repository<GameEntity>
    ) {}

    private async checkPlayer(playerToken): Promise<boolean> {
        return !(await this.gameRepository
            .createQueryBuilder('game')
            .where('game.firstPlayerToken = :token', { token: playerToken } )
            .orWhere('game.secondPlayerToken = :token', { token: playerToken } )
            .getOne())
    }

    async createGame(data): Promise<GameEntity | null> {

        const checkToken = await this.gameRepository.findOne( { where: {
            firstPlayerToken: data.token
            }} )

        if(!checkToken){
            const gameData = await this.gameRepository.create( {firstPlayerToken: data.token} )
            return await this.gameRepository.save(gameData)
        }
        return null
    }

    async joinGame(data): Promise<GameEntity | null> {
        const gameData = await this.gameRepository.findOne( { where: {
            firstPlayerToken: data.enemyToken
            }})
        const checkSecondPlayer = gameData.secondPlayerToken || null
        const id = gameData.id

        if(gameData && !checkSecondPlayer) {
            await this.gameRepository.update(id, {secondPlayerToken: data.token} )
            return gameData
        }
        return null
    }

    async deleteGame(data): Promise<GameEntity | null>{

        const additionalCheck = await this.checkPlayer(data.token)

        console.log(additionalCheck)

        return null
    }
}