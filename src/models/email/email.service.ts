import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getDataSourceName } from '@nestjs/typeorm';
import * as nodeMailer from 'nodemailer';
import { DataSource, getConnection } from 'typeorm';
import * as uuid from 'uuid';
import { UsersRepository } from '../users/repository/users.repository';
import { EmailRepository } from './Repository/email.repository';

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly emailRepository: EmailRepository,
        private readonly usersRepository: UsersRepository,
    ){}

    async emailAuth(email) {
        try {
            const currentDate = new Date();
            const secret = uuid.v1();
            const url = this.configService.get<string>('URL');
            
            const userNo = await this.createEmailSendHistory(email, currentDate);
            
            const emailInfo = await this.emailRepository.emailInfo(userNo);

            // 이메일 발송시간 제한
            const emailSendedAt = new Date(emailInfo.emailSendedAt);
            emailSendedAt.setMinutes(emailSendedAt.getMinutes() + 1);
            
            if (currentDate <= emailSendedAt) {
                throw new BadRequestException(1006);
            };

            await this.emailRepository.setAuthEmail(emailInfo.no, secret);

            // const transporter = nodeMailer.createTransport({
            //     service: this.configService.get<string>('EMAIL_SERVICE'),
            //     auth: {
            //         user: this.configService.get<string>('EMAIL_ID'),
            //         pass: this.configService.get<string>('EMAIL_PASSWORD')
            //     }
            // })

            // const mailOptions = {
            //     to: email,
            //     subject:'이메일 인증 메일',
            //     html: `
            //     가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
            //     <form action="${url}/${secret}" method="GET">
            //     <button>가입확인</button>
            //     </form>  
            //     `,
            // }

            // await transporter.sendMail(mailOptions);
        } catch (err) {
            throw err;
        } finally {
        }
    }

    async createEmailSendHistory(email, currentDate) {
        try {
            const userInfo = await this.usersRepository.userConfirm(email);
            if (!userInfo) {
                throw new NotFoundException(1000);
            }

            await this.emailRepository.createAuthEmail(userInfo.no, currentDate);

            return userInfo.no;
        } catch (err) {
            throw err;
        }
    }
}
