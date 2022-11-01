import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('schools')
export class School extends BaseEntity {
    @PrimaryGeneratedColumn()
    no: number;

    @ApiProperty({
        example: "서울대학교",
        description: '학교 이름을 입력 해 주세요'
      })
    @Column({
        type: 'varchar',
        length: 255
    })
    name: string;
}
