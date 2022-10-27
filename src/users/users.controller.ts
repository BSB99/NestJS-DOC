import { Body, Controller, Get, Param, Post, Res, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';
import { Response, response } from 'express';
import { JwtRefreshGuard } from 'src/guard/jwt-refresh';
import { RefreshDto } from './dto/refresh.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Bearer Token 인증 API', description: 'Bearer Token 인증'})
    @UseGuards(AuthGuard('jwt'))
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
            const response:object = await this.usersService.signIn(signInDto);

            return response;
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Token Decode API', description: 'Token Decode'})
    @Get('decode-uri/:jwtToken')
    async decode(@Param('jwtToken') jwtToken: string) {
        try {
            const response: object = await this.usersService.decode(jwtToken);

            return response;
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'access Token 재발급 API', description: 'access Token 재발급'})
    @ApiBearerAuth('refresh-token')
    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refreshToken(@Body() refreshDto: RefreshDto, @Request() req){
      try {
        return req.user.accessToken;
      } catch(err) {
        throw err;
      }
    }
}
