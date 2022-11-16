import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        length: 255
    })
    image: string;

    @Column({
        type: 'date'
    })
    date_birth: Date;

    @Column({
        type: 'varchar',
        length: 20
    })
    phone_number: string;

    @Column({
        type: 'mediumtext',
    })
    introduce: string;

    @Column({
        type: 'int'
    })
    language: number;

    @Column({
        type: 'tinyint'
    })
    service_agreement: boolean;

    @Column({
        type: 'tinyint'
    })
    privacy_terms: boolean;

    @Column({
        type: 'tinyint'
    })
    cookie_policy: boolean;

    @Column({
        type: 'tinyint'
    })
    marketing_terms: boolean;
    
    @Column({
        type: 'tinyint'
    })
    active: boolean;

    @Column({
        type: 'varchar',
        length: 50
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
}