import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstPlayerToken: string;

    @Column( {nullable: true} )
    secondPlayerToken: string;
}