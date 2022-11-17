import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthEmailDto } from './dto/auth-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService
    ){}

    @ApiOperation({ summary: '이메일 인증 URL 전송 API', description: '이메일 인증 URL 전송'})
    @Get('auth')
    async emailAuth(@Body() authEmailDto: AuthEmailDto) {
        try {
            return await this.emailService.emailAuth(authEmailDto);
        } catch (err) {
            throw err;
        }
    }
}
