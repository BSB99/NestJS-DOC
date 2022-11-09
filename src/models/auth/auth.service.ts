import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { object } from 'joi';
import { Payload } from 'src/common/interface/error.interface';
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

    async issueanceToken(payload: Payload, secret) {
        try {
            switch(payload.type) {
                case 'accessToken':
                    return this.jwtService.sign(payload, 
                        {
                            secret: this.configService.get<string>(secret.key), 
                            expiresIn: this.configService.get<string>(`${secret.expiresin}`)
                        }
                    );
                case 'refreshToken':
                    return this.jwtService.sign(payload, 
                        {
                            secret: this.configService.get<string>(secret.key), 
                            expiresIn: this.configService.get<string>(`${secret.expiresin}`)
                        }
                    );
                default:
                    throw new BadRequestException(1004);
            }
        } catch (err) {
            throw err;
        }
    }

    /*
    async accessToken(payload: object, secret) {
        try {
            return this.jwtService.sign(payload, 
                    {
                        secret: this.configService.get<string>(secret.key), 
                        expiresIn: this.configService.get<string>(`${secret.expiresin}`)
                    }
                )
        } catch(err) {
            throw err;
        }
    }

    async refreshToken(payload: object, secret) {
        try {
            return this.jwtService.sign(payload, 
                    {
                        secret: this.configService.get<string>(secret.key), 
                        expiresIn: this.configService.get<string>(`${secret.expiresin}`)
                    }
                );
        } catch (err) {
            throw err;
        }
    }*/

    async decodeToken(token: string, secret) {
        try {
            return await this.jwtService.verify(token, {
                secret: this.configService.get<string>(secret)
            });
        } catch (err) {
            this.errorCustoms.tokenError(err);
        }   
    }

    /*
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
    }*/

    async refreshTokenConfirm(resRefreshToken:string, userId: string) {
        try {
            const userInfo = await this.usersRepository.signIn(userId);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            };

            const currentRefreshToken = await this.decodeToken(resRefreshToken, 'REFRESH_KEY');
            const certificateRefreshToken = await this.decodeToken(userInfo.refreshToken, 'REFRESH_KEY');
            
        if (currentRefreshToken.email === certificateRefreshToken.email) {
            const accessToken = await this.issueanceToken(
                {
                    email : certificateRefreshToken.email, 
                    id: certificateRefreshToken.id,
                    type: 'accessToken'
                },
                {key: 'ACCESS_KEY', expiresin:'ACCESS_KEY_EXPIRESIN'}
            );

            return {accessToken};
        };

        throw new UnauthorizedException(1003);
        } catch (err) {
            throw err;
        }
    }
}
