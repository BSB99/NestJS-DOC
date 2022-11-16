import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload, Secret } from 'src/common/interface/token.interface';
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


    async issuanceToken(payload: Payload, secret: Secret) {
        try {
            return this.jwtService.sign(payload, {
                secret: this.configService.get<string>(secret.key),
                expiresIn: this.configService.get<string>(`${secret.expiresin}`)
            });
        } catch (err) {
            throw err;
        }
    }

    async decodeToken(token: string, secret: string) {
        try {
            return await this.jwtService.verify(token, {
                secret: this.configService.get<string>(secret)
            });
        } catch (err) {
            this.errorCustoms.tokenError(err);
        }   
    }

    async refreshTokenConfirm(resRefreshToken:string, email: string) {
        try {
            const userInfo = await this.usersRepository.signIn(email);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            };

            const currentRefreshToken = await this.decodeToken(resRefreshToken, 'REFRESH_KEY');
            const certificateRefreshToken = await this.decodeToken(userInfo.refreshToken, 'REFRESH_KEY');
            
        if (currentRefreshToken.email === certificateRefreshToken.email) {
            const accessToken = await this.issuanceToken(
                {
                    email : certificateRefreshToken.email, 
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
