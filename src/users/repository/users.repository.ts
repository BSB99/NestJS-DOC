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

    async signIn(userInfo) {
        try {
            const {id, psword} = userInfo;

            return await this.usersRepository.createQueryBuilder('users')
            .select('users.email')
            .where('users.id = :id', {id})
            .andWhere('users.password = :psword', {psword})
            .getOne();

        } catch(err) {
            throw err;
        }
    }
}