import { School } from "src/schools/entity/Schools.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    no: number;

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
        type: 'int'
    })
    school: number;
}
