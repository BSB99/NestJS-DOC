import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';
import * as uuid from 'uuid';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/repository/users.repository';

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersRepository: UsersRepository,
        private readonly authService: AuthService,
    ){}

    async emailAuth({email}) {
        try {
            const emailConfirm = await this.usersRepository.emailConfirm(email);
            
            if (!emailConfirm) {
                throw new BadRequestException(1001);
            }

            const currentDate = new Date();
            const emailAt = new Date(emailConfirm.emailAt);
            // 이메일 발송시간 제한
            emailAt.setMinutes(emailAt.getMinutes() + 1)
            
            if (currentDate <= emailAt) {
                throw new BadRequestException(1006);
            };

            await this.usersRepository.authEmailAt(currentDate, email);

            const secret = uuid.v1();
            
            await this.usersRepository.uuidSet(email, secret);

            const transporter = nodeMailer.createTransport({
                service: this.configService.get<string>('EMAIL_SERVICE'),
                auth: {
                    user: this.configService.get<string>('EMAIL_ID'),
                    pass: this.configService.get<string>('EMAIL_PASSWORD')
                }
            })

            const url = this.configService.get<string>('URL');

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
