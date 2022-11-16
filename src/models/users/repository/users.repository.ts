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
            .select(['users.email', 'users.salt', 'users.refreshToken'])
            .where('users.email = :email', {email})
            .getOne();
        
            return user;
        } catch(err) {
            throw err;
        }
    }

    async signUp(signUpDto) {
        try {
            const {email, password, name} = signUpDto;

            const {raw} = await this.usersRepository.createQueryBuilder('users')
            .insert()
            .into(User)
            .values([
                {
                    email, 
                    salt: password, 
                    name
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

    async emailConfirm(email: string) {
        try {
            return await this.usersRepository.createQueryBuilder('users')
            .select(['users.no'])
            .where('users.email = :email', {email})
            .getOne();

        } catch (err) {
            throw err;
        }
    }
}