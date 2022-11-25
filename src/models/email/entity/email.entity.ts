import { User } from "src/models/users/entity/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth_email')
export class AuthEmail extends BaseEntity {
    @PrimaryGeneratedColumn()
    no: number;

    @Column({
        nullable: true
    })
    uuid: string;

    @Column({
        type: 'datetime',
        nullable: true
    })
    sendedAt: Date|null;

    @ManyToOne(() => User, user => user.no)
    @JoinColumn({name:'user_no'})
    user_no: User;
}