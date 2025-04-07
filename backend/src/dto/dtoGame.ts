import {IsNotEmpty} from "class-validator";

export class DtoGameJoin {
    @IsNotEmpty()
    token: string

    @IsNotEmpty()
    enemyToken: string
}

export class DtoGameStart {
    @IsNotEmpty()
    token: string
}

export class DtoGameDelete {
    @IsNotEmpty()
    token: string
}