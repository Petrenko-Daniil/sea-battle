import {
    Body,
    Controller,
    Delete,
    HttpException,
    HttpStatus,
    Post,
    Res
} from "@nestjs/common";
import {DtoGameDelete, DtoGameJoin, DtoGameStart} from "../dto/dtoGame";
import {GameService} from "../services/gameService";

@Controller()
export class GameApiController {
    constructor(private gameService: GameService) {}

    @Post('api/game/create')
    async createGame(@Body() dtoGameStart: DtoGameStart, @Res() res: Res) {
        try {
            await this.gameService.createGame(dtoGameStart)
            return res
                .status(200)
                .json({
                    message: "Created game"
                })
        } catch (error: any){
            return res
                .status(400)
                .json({
                    message: error.message
                })
        }
    }

    @Post('api/game/join')
    async joinGame(@Body() dtoGameJoin: DtoGameJoin): Promise<HttpException> {
        if(await this.gameService.joinGame(dtoGameJoin)){
            throw new HttpException('Player has been connected', HttpStatus.OK)
        }
        throw new HttpException("Player was not connected", HttpStatus.FORBIDDEN)
    }

    @Delete('api/game/delete')
    async deleteGame(@Body() dtoGameDelete: DtoGameDelete): Promise<HttpException> {
        if(await this.gameService.deleteGame(dtoGameDelete)) {
            throw new HttpException('Game was deleted', HttpStatus.OK)
        }
        throw new HttpException('Game was removed', HttpStatus.FORBIDDEN)
    }
}