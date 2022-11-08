import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/models/users/repository/users.repository';
import { ErrorCustoms } from '../../common/customs/error';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        private readonly usersRepository: UsersRepository,

        private readonly configService: ConfigService,

        private readonly errorCustoms: ErrorCustoms
    ){}

    async accessToken(payload: object) {
        try {
            return this.jwtService.sign(payload, 
                    {
                        secret: this.configService.get<string>('ACCESS_KEY'), 
                        expiresIn: this.configService.get<string>('ACCESS_KEY_EXPIRESIN')
                    }
                )
        } catch(err) {
            throw err;
        }
    }

    async refreshToken(payload: object) {
        try {
            return this.jwtService.sign(payload, 
                    {
                        secret: this.configService.get<string>('REFRESH_KEY'), 
                        expiresIn: this.configService.get<string>('REFRESH_KEY_EXPIRESIN')
                    }
                );
        } catch (err) {
            throw err;
        }
    }

    async accessTokenDecode(accessToken: string) {
        try {
            return await this.jwtService.verify(accessToken, {
                secret: this.configService.get<string>('ACCESS_KEY')
            });
        } catch (err) {
            this.errorCustoms.tokenError(err);
        }   
    }

    async refreshTokenDecode(refreshToken: string) {
        try {
            return await this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_KEY')
            });
        } catch (err) {
            this.errorCustoms.tokenError(err);
        }   
    }

    async refreshTokenConfirm(resRefreshToken:string, userId: string) {
        try {
            const userInfo = await this.usersRepository.signIn(userId);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            };

            const currentRefreshToken = await this.refreshTokenDecode(resRefreshToken);
            const certificateRefreshToken = await this.refreshTokenDecode(userInfo.refreshToken);
            
        if (currentRefreshToken.email === certificateRefreshToken.email) {
            const accessToken = await this.accessToken(
                {
                    email : certificateRefreshToken.email, 
                    id: certificateRefreshToken.id
                }
            );

            return {accessToken};
        };

        throw new UnauthorizedException(1003);
        } catch (err) {
            throw err;
        }
    }
}
