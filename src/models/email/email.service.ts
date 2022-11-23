import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';
import * as uuid from 'uuid';
import { EmailRepository } from './Repository/email.repository';

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly emailRepository: EmailRepository
    ){}

    async emailAuth(email) {
        try {
            const emailInfo = await this.emailRepository.emailConfirm(email);
            const currentDate = new Date();
            const secret = uuid.v1();
            const url = this.configService.get<string>('URL');
            
            if (!emailInfo) {
                throw new BadRequestException(1001);
            }

            // 이메일 발송시간 제한
            if (emailInfo.emailSendedAt) {
                const emailAt = new Date(emailInfo.emailSendedAt);
                emailAt.setMinutes(emailAt.getMinutes() + 1);

                if (currentDate <= emailAt) {
                    throw new BadRequestException(1006);
                };
            }

            await this.emailRepository.setAuthEmail(currentDate, emailInfo.no, secret);

            const transporter = nodeMailer.createTransport({
                service: this.configService.get<string>('EMAIL_SERVICE'),
                auth: {
                    user: this.configService.get<string>('EMAIL_ID'),
                    pass: this.configService.get<string>('EMAIL_PASSWORD')
                }
            })

            const mailOptions = {
                to: email,
                subject:'이메일 인증 메일',
                html: `
                가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
                <form action="${url}/${secret}" method="GET">
                <button>가입확인</button>
                </form>  
                `,
            }

            await transporter.sendMail(mailOptions);
        } catch (err) {
            throw err;
        }
    }
}
