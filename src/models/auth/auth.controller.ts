import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
            return {msg: '인증 완료'};
        } catch (err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Access Token Decode API', description: 'Access Token Decode'})
    @Get('decode-uri/:jwtToken')
    async accessTokenDecode(@Param('jwtToken') jwtToken: string) {
        try {
            const response: object = await this.authService.tokenDecode(jwtToken, 'AccessToken');

            return response;
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: 'Refresh Token Decode API', description: 'Refresh Token Decode'})
    @Get('refresh-token-decode-uri/:jwtToken')
    async refreshTokenDecode(@Param('jwtToken') jwtToken: string) {
        try {
            const response: object = await this.authService.tokenDecode(jwtToken, 'RefreshToken');

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
