import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/users/entity/users.entity";
import { EntityManager, Repository } from "typeorm";
import { AuthEmail } from "../entity/email.entity";

@Injectable()
export class EmailRepository{
    constructor(
        @InjectRepository(User, 'testDB_1')
        private usersRepository: Repository<User>,

        @InjectRepository(AuthEmail, 'testDB_1')
        private emailRepository: Repository<AuthEmail>,
    ){}
    
    async runTransaction(tx: (entityManager: EntityManager) => Promise<unknown>): Promise<{}> {
        return new Promise(async (resolve) => {
          await this.emailRepository.manager.transaction(tx);
          resolve({});
        });
      }

    async emailInfo(no) {
        try {            
            const emailInfo = await this.emailRepository.createQueryBuilder('email_auth')
            .select(
                [
                    'email_auth.no AS EmailNo', 
                    `CONVERT_TZ(email_auth.sendedAt, '+00:00', '+09:00') AS emailSendedAt`
                ]
            )
            .where('email_auth.user_no = :no', {no})
            .orderBy('email_auth.sendedAt', 'DESC')
            .getRawOne();
            
            return emailInfo;
        } catch (err) {
            throw err;
        }
    }

    async createAuthEmail(no, currentDate) {
        try {
            const {raw} = await this.emailRepository.createQueryBuilder('auth_email')
            .insert()
            .into(AuthEmail)
            .values({
                user_no: no,
                sendedAt: currentDate
            })
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

    async setAuthEmail(no, secret) {
        try {
            return await this.emailRepository.createQueryBuilder()
            .update(AuthEmail)
            .set(
                {
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