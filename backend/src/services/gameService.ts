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

    private async isPlayerInAnyGame(playerToken): Promise<boolean> {
        return !!(await this.gameRepository
            .createQueryBuilder('game')
            .where('game.firstPlayerToken = :token', { token: playerToken } )
            .orWhere('game.secondPlayerToken = :token', { token: playerToken } )
            .getOne())
    }

    async createGame(data): Promise<GameEntity | null> {
        const checkToken = await this.gameRepository.findOne( { where: {
            firstPlayerToken: data.token
            }} )
        const isPlayerBusy = await this.isPlayerInAnyGame(data.token)

        if(!checkToken && !isPlayerBusy){
            const gameData = await this.gameRepository.create( {firstPlayerToken: data.token} )
            return await this.gameRepository.save(gameData)
        }
        return null
    }

    async joinGame(data): Promise<GameEntity | null> {
        const gameData = await this.gameRepository.findOne( {
            where: {
                firstPlayerToken: data.enemyToken
            }
        })

        if(!gameData){
            throw new Error('Game not found.')
        }

        const checkSecondPlayer = gameData.secondPlayerToken || null

        const id = gameData.id
        const isPlayerBusy = this.isPlayerInAnyGame(data.token)

        if(checkSecondPlayer) {
            throw new Error('Game is full')
        }

        if(!isPlayerBusy){
            throw new Error('Player is already in game')
        }

        await this.gameRepository.update(id, {secondPlayerToken: data.token} )
        return gameData
    }

    async deleteGame(data): Promise<GameEntity | null>{
        const additionalCheck = await this.isPlayerInAnyGame(data.token)

        console.log(additionalCheck)

        return null
    }
}