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
            .select(['users.no AS no', `CONVERT_TZ(users.emailAt, '+00:00', '-05:00') AS emailAt`])
            .where('users.email = :email', {email})
            .getRawOne();

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

    async emailVerification(uuid) {
        try {
            return await this.usersRepository.createQueryBuilder()
            .update(User)
            .set({active: true})
            .where('users.uuid = :uuid',{uuid})
            .execute();
            
        } catch (err) {
            throw err;
        }
    }

    async uuidSet(email: string, secret: string) {
        try {
            return await this.usersRepository.createQueryBuilder()
            .update(User)
            .set({uuid: secret})
            .where('users.email = :email',{email})
            .execute();

        } catch (err) {
            throw err;
        }
    }

    async uuidConfirm(uuid) {
        try {
            return await this.usersRepository.createQueryBuilder('users')
            .select(['users.no'])
            .where('users.uuid = :uuid', {uuid})
            .getOne();

        } catch (err) {
            throw err;
        }
    }

    async authEmailAt(date, email) {
        try {
            return await this.usersRepository.createQueryBuilder()
            .update(User)
            .set({emailAt: date})
            .where('users.email = :email', {email})
            .execute()

        } catch (err) {
            throw err;
        }
    }

    async activeConfirm(uuid) {
        try {
            return await this.usersRepository.createQueryBuilder('users')
            .select(['users.active'])
            .where('users.uuid = uuid', {uuid})
            .getOne();
        } catch (err) {
            throw err;
        }
    }
}