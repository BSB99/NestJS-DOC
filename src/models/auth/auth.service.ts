import { GoneException, Injectable, InternalServerErrorException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
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
    
    // 리팩토링 후 토큰 발급 코드
    async issuanceToken(email: string, id?: string, type?: string) {
        try {
            if (type === 'AccessToken') {
                const payload = { email, type: 'AccessToken', user_id: id };

                return {
                    accessToken: this.jwtService.sign(payload, 
                        {
                            secret:this.configService.get<string>('ACCESS_KEY'), 
                            expiresIn: this.configService.get<string>('ACCESS_KEY_EXPIRESIN')
                        }
                    )
                }
            } else if (type === 'RefreshToken') {
                 // RefreshToken payload에는 중요한 값 저장 X
                const payload = { email, type: 'RefreshToken' };

                return {
                    refreshToken: this.jwtService.sign(payload, 
                        {
                            secret:this.configService.get<string>('REFRESH_KEY'),   
                            expiresIn: this.configService.get<string>('REFRESH_KEY_EXPIRESIN')
                        }
                    )
                }     
            } else {
                throw new BadRequestException(1004);
            }
        } catch (err) {
            throw err;
        }
    }

    /*리팩토링 전 Token 발급 코드
    async accessToken(email: string, id?: string) {
        try {
            const payload = { email, type: 'AccessToken', user_id: id };

            return {
                accessToken: this.jwtService.sign(payload, 
                    {
                        secret:this.configService.get<string>('ACCESS_KEY'), 
                        expiresIn: this.configService.get<string>('ACCESS_KEY_EXPIRESIN')
                    }
                )
            }
        } catch(err) {
            throw err;
        }
    }

    async refreshToken(email: string) {
        try {
            const payload = { email, type: 'RefreshToken' };

            return {
                refreshToken: this.jwtService.sign(payload, 
                    {
                        secret:this.configService.get<string>('REFRESH_KEY'), 
                        expiresIn: this.configService.get<string>('REFRESH_KEY_EXPIRESIN')
                    }
                )
            }
        } catch (err) {
            throw err;
        }
    }*/

    // 리팩토링 후 토큰 Decode 코드
    async tokenDecode(jwtToken: string, type?: string) {
        try {
            if (type === 'AccessToken') {
                return await this.jwtService.verify(jwtToken, {secret: this.configService.get<string>('ACCESS_KEY')});
            } else if (type === 'RefreshToken') {
                return await this.jwtService.verify(jwtToken, {secret: this.configService.get<string>('REFRESH_KEY')});
            } else {
                throw new BadRequestException(1004);
            }
        } catch (err) {
            switch (err.message) {
                case 'INVALID_TOKEN':
                case 'TOKEN_IS_ARRAY':
                case 'NO_USER':
                    throw new UnauthorizedException(1003);

                case 'invalid signature':
                    throw new BadRequestException(1004);

                case 'jwt expired':
                    throw new GoneException(1010);
                
                default:
                    throw new InternalServerErrorException(1500)
            }
        }   
    }

    /*리팩토링 전 토큰 Decode 코드
    async accessTokenDecode(jwtToken: string) {
        try {
            const payload = await this.jwtService.verify(jwtToken, {secret: this.configService.get<string>('ACCESS_KEY')});

            return payload;
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
            const payload = await this.jwtService.verify(jwtToken, {secret: this.configService.get<string>('REFRESH_KEY')});

            return payload;
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
    }*/

    async refreshTokenConfirm(resRefreshToken:string, id: string) {
        try {
            const userInfo = await this.usersRepository.signIn(id);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            }

            const currentRefreshToken = await this.tokenDecode(resRefreshToken, 'RefreshToken');
            const cerfitcateRefreshToken = await this.tokenDecode(userInfo.refreshToken, 'RefreshToken');
            
        if (currentRefreshToken.email === cerfitcateRefreshToken.email) {
            const accessToken = await this.issuanceToken(cerfitcateRefreshToken.email, cerfitcateRefreshToken.id, 'AccessToken');

            return {accessToken};
        }

        throw new UnauthorizedException(1003);
        } catch (err) {
            throw err;
        }
    }
}
