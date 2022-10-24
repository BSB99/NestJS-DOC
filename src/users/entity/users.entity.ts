import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    no: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    password: string
}