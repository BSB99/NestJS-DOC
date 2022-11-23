import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entity/users.entity";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User, 'testDB_1')
        private usersRepository: Repository<User>,
    ){}

    async signIn(email: string) {
        try {
            const user = await this.usersRepository.createQueryBuilder('users')
            .select(['users.no','users.email', 'users.salt', 'users.active','users.refreshToken'])
            .where('users.email = :email', {email})
            .getOne();
        
            return user;
        } catch(err) {
            throw err;
        }
    }

    async signUp(signUpDto, insertId) {
        try {
            const {email, password, name} = signUpDto;

            const {raw} = await this.usersRepository.createQueryBuilder('users')
            .insert()
            .into(User)
            .values([
                {
                    email, 
                    salt: password, 
                    name,
                    auth_email: insertId
                }
            ])
            .execute();

            return raw;
        } catch (err) {
            throw err;
        }
    }

    async refreshToken(email: string, refreshToken: string) {
        try {
            return await this.usersRepository.createQueryBuilder()
            .update(User)
            .set({refreshToken})
            .where('users.email = :email',{email})
            .execute();

        } catch (err) {
            throw err;
        }
    }

    async userInfo(no) {
        try {
            return await this.usersRepository.createQueryBuilder('users')
            .select(['users.no', 'users.email', 'users.name'])
            .where('users.no = :no', {no})
            .getOne();

        } catch (err) {
            throw err;
        }
    }

    async emailVerification(no) {
        try {
            return await this.usersRepository.createQueryBuilder()
            .update(User)
            .set({active : true})
            .where('users.no = :no',{no})
            .execute();

        } catch (err) {
            throw err;
        }
    }
}