import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: 'Bearer Token 인증 API', description: 'Bearer Token 인증'})
    @UseGuards(JwtAuthGuard)
    @Get()
    async qualificate() {
        try {
            return {msg: '인증 완료'};
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Token 발급 API', description: 'Token 발급'})
    @Post()
    async signIn(@Body() signInDto: SignInDto) {
        try {
            const response = await this.usersService.signIn(signInDto);

            return response;
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Token Decode API', description: 'Token Decode'})
    @Get('decode-uri/:jwtToken')
    async decode(@Param('jwtToken') jwtToken: string) {
        try {
            const response = await this.usersService.decode(jwtToken);

            return response;
        } catch(err) {
            throw err;
        }
    }
}
