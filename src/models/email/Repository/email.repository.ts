import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/users/entity/users.entity";
import { Repository } from "typeorm";
import { AuthEmail } from "../entity/email.entity";

@Injectable()
export class EmailRepository{
    constructor(
        @InjectRepository(User, 'testDB_1')
        private usersRepository: Repository<User>,

        @InjectRepository(AuthEmail, 'testDB_1')
        private emailRepository: Repository<AuthEmail>,
    ){}

    async emailConfirm(email: string) {
        try {            
            const test = await this.usersRepository.createQueryBuilder('users')
            .leftJoin('users.auth_email', 'authEmail')
            .select(
                [
                    'users.no AS no',
                    'authEmail.no AS EmailNo', 
                    `CONVERT_TZ(authEmail.sendedAt, '+00:00', '-05:00') AS emailSendedAt`
                ]
            )
            .where('users.email = :email', {email})
            .getRawOne();

            return test
        } catch (err) {
            throw err;
        }
    }

    async createAuthEmail() {
        try {
            const {raw} = await this.emailRepository.createQueryBuilder('auth_email')
            .insert()
            .into(AuthEmail)
            .values({})
            .execute();
            
            return raw;
        } catch (err) {
            throw err;
        }
    }

    async uuidVerification(uuid) {
        try {
            return await this.emailRepository.createQueryBuilder('auth_email')
            .select(['auth_email.no'])
            .where('auth_email.uuid = :uuid',{uuid})
            .getOne();
            
        } catch (err) {
            throw err;
        }
    }

    async activeConfirm(uuid) {
        try {
            return await this.emailRepository.createQueryBuilder('auth_email')
            .select(['auth_email.no'])
            .where('auth_email.uuid = uuid', {uuid})
            .getOne();

        } catch (err) {
            throw err;
        }
    }

    async setAuthEmail(date, no, secret) {
        try {
            return await this.emailRepository.createQueryBuilder()
            .update(AuthEmail)
            .set(
                {
                    sendedAt: date,
                    uuid: secret
                }
            )
            .where('auth_email.no = :no', {no})
            .execute();

        } catch (err) {
            throw err;
        }
    }
}