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

    async signIn(id: string) {
        try {
            const user = await this.usersRepository.createQueryBuilder('users')
            .select(['users.id','users.email', 'users.salt', 'users.refreshToken'])
            .where('users.id = :id', {id})
            .getOne();
        
            return user;
        } catch(err) {
            throw err;
        }
    }

    async signUp(signUpDto) {
        try {
            const {email, id, password, name} = signUpDto;

            const {raw} = await this.usersRepository.createQueryBuilder('users')
            .insert()
            .into(User)
            .values([
                {
                    email, 
                    id, 
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

    async refreshToken(id: string, refreshToken: string) {
        try {
            return await this.usersRepository.createQueryBuilder()
            .update(User)
            .set({refreshToken})
            .where('users.id = :id',{id})
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

    async idConfirm(id: string) {
        try {
            return await this.usersRepository.createQueryBuilder('users')
            .select(['users.no'])
            .where('users.id = :id', {id})
            .getOne();

        } catch (err) {
            throw err;
        }
    }
}