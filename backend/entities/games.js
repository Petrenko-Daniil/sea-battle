import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Games {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstToken: string
    @Column()
    secondToken: string
}