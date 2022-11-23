import { AuthEmail } from "src/models/email/entity/email.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    no: number;

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
        type: 'varchar',
        length: 255,
        nullable: true
    })
    image: string;

    @Column({
        type: 'date',
        nullable: true
    })
    date_birth: Date;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true
    })
    phone_number: string;

    @Column({
        type: 'mediumtext',
        nullable: true,
    })
    introduce: string;

    @Column({
        type: 'int',
        nullable: true
    })
    language: number;

    @Column({
        type: 'tinyint',
        nullable: true,
    })
    service_agreement: boolean;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    privacy_terms: boolean;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    cookie_policy: boolean;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    marketing_terms: boolean;
    
    @Column({
        type: 'tinyint',
        default: false
    })
    active: boolean;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    otp_secret: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date|null;

    @DeleteDateColumn({
        nullable: true
    })                                                                                                                                                                                                                                                  
    deletedAt: Date|null

    // 지울예정
    @Column({
        nullable: true
    })
    refreshToken: string;

    @OneToOne(() => AuthEmail)
    @JoinColumn({name: 'auth_email_no'})
    auth_email: number
}