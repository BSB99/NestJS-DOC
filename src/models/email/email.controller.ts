import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('email')
@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService
    ){}

    @ApiOperation({ summary: '이메일 인증 URL 전송 API', description: '이메일 인증 URL 전송'})
    @Get('auth/:email')
    async emailAuth(@Param('email') email: string) {
        try {
            return await this.emailService.emailAuth(email);
        } catch (err) {
            throw err;
        }
    }
}
