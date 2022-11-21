import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { request } from 'express';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Bearer Token 인증 API', description: 'Bearer Token 인증'})
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async qualificate() {
        try {
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Access Token Decode API', description: 'Access Token Decode'})
    @Get('decode-uri/:jwtToken')
    async accessTokenDecode(@Param('jwtToken') jwtToken: string) {
        try {
            return await this.authService.decodeToken(jwtToken, 'ACCESS_KEY');
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Refresh Token Decode API', description: 'Refresh Token Decode'})
    @Get('refresh-token-decode-uri/:jwtToken')
    async refreshTokenDecode(@Param('jwtToken') jwtToken: string) {
        try {
            return await this.authService.decodeToken(jwtToken, 'REFRESH_KEY');
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'access Token 재발급 API', description: 'access Token 재발급'})
    @ApiBearerAuth('refresh-token')
    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refreshToken(@Body() refreshDto: RefreshDto, @Request() req) {
        try {
            return {accessToken : req.user.accessToken};
        } catch(err) {
            throw err;
        }
    }
}
