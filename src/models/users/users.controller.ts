import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users.service';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: 'Token 발급 API', description: 'Token 발급'})
    @Post()
    async signIn(@Body() signInDto: SignInDto) {
        try {
            return await this.usersService.signIn(signInDto);
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '회원가입 API', description: '회원가입'})
    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
        try {
            await this.usersService.signUp(signUpDto);
        } catch (err) {
            throw err;
        }
    }
}
