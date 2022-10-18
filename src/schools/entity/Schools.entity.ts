import { Student } from "src/students/entity/Students.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('schools')
export class School extends BaseEntity {
    @PrimaryGeneratedColumn()
    no: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    name: string;

    // @OneToMany(() => Student, (student) => student.school)
    // student: Promise<Student[]>;
}