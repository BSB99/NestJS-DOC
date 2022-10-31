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
            .select(['users.email', 'users.password', 'users.refreshToken'])
            .where('users.id = :id', {id})
            .getOne();
        
            return user;
        } catch(err) {
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
}