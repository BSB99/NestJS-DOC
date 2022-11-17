import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorators';
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

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: '유저 정보 API', description: '유저 정보'})
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async userInfo(@CurrentUser() user) {
        try {
            return await this.usersService.userInfo(user.no);
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '이메일 인증 확인 API', description: '이메일 인증 확인'})
    @Get('verification/:email')
    async emailVerification(@Param('email') email:string) {
        try {
            return await this.usersService.emailVerification(email);
        } catch (err) {
            throw err;
        }
    }
}
