import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dogs extends BaseEntity {
    @PrimaryGeneratedColumn()
    no:number;

    @Column({
        type: 'varchar',
        length: 255
    })
    name: string;

    @Column({
        type: 'int',
    })
    age: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    breed: string;
}