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
            return await this.usersRepository.createQueryBuilder('users')
            .select(['users.email', 'users.password'])
            .where('users.id = :id', {id})
            .getOne();
            
        } catch(err) {
            throw err;
        }
    }
}