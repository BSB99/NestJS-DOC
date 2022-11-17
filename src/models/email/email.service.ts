import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
    ){}

    async emailAuth({email}) {
        try {
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
                <form action="http://" method="GET">
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
