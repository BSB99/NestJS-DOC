import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    no: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
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
    salt: string;

    @Column({
        type: 'varchar',
        length: 30
    })
    name: string;

    @Column({
        nullable: true
    })
    refreshToken: string;

    @Column({
        default: false
    })
    active: boolean;
}