import { GoneException, Injectable, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/models/users/repository/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        private readonly usersRepository: UsersRepository,

        private readonly configService: ConfigService
    ){}

    async accessToken(email: string) {
        try {
            const payload = { email };

            return {
                accessToken: this.jwtService.sign(payload, {secret:this.configService.get<string>('ACCESS_KEY'), expiresIn: this.configService.get<string>('ACCESS_KEY_EXPIRESIN')})
            }
        } catch(err) {
            throw err;
        }
    }

    async refreshToken(email: string) {
        try {
            const payload = { email};

            return {
                refreshToken: this.jwtService.sign(payload, {secret:this.configService.get<string>('REFRESH_KEY'), expiresIn: this.configService.get<string>('REFRESH_KEY_EXPIRESIN')})
            }
        } catch (err) {
            throw err;
        }
    }

    async accessTokenDecode(jwtToken: string) {
        try {
            const {email} = await this.jwtService.verify(jwtToken, {secret: this.configService.get<string>('ACCESS_KEY')});

            return {email};
        } catch (err) {
            switch (err.message) {
                case 'INVALID_TOKEN':
                case 'TOKEN_IS_ARRAY':
                case 'NO_USER':
                    throw new UnauthorizedException(1003);

                case 'jwt expired':
                    throw new GoneException(1010);
                
                default:
                    throw new InternalServerErrorException(1500)
            }
        }   
    }

    async refreshTokenDecode(jwtToken: string) {
        try {
            const {email} = await this.jwtService.verify(jwtToken, {secret: this.configService.get<string>('REFRESH_KEY')});

            return {email};
        } catch (err) {
            switch (err.message) {
                case 'INVALID_TOKEN':
                case 'TOKEN_IS_ARRAY':
                case 'NO_USER':
                    throw new UnauthorizedException(1003);

                case 'jwt expired':
                    throw new GoneException(1010);
                
                default:
                    throw new InternalServerErrorException(1500)
            }
        }   
    }

    async refreshTokenConfirm(resRefreshToken:string, id: string) {
        try {
            const userInfo = await this.usersRepository.signIn(id);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            }

            const currentRefreshToken = await this.refreshTokenDecode(resRefreshToken);
            const cerfitcateRefreshToken = await this.refreshTokenDecode(userInfo.refreshToken);
            
        if (currentRefreshToken.email === cerfitcateRefreshToken.email) {
            const accessToken = await this.accessToken(cerfitcateRefreshToken.email);
            return {accessToken};
        }

        throw new UnauthorizedException(1003);
        } catch (err) {
            throw err;
        }
    }
}
