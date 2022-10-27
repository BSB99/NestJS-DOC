import { BadRequestException, GoneException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './repository/users.repository';
import { payload } from './security/payload';
@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signIn({id, psword}) {
        try {
            const userInfo = await this.usersRepository.signIn(id);
            if (userInfo === null) {
                throw new BadRequestException('1000');
            }

            const {email, password} = userInfo;
            if (psword !== password) {
                throw new UnauthorizedException('1003')
            }
            
            const {accessToken} = await this.accessToken(email);
            const {refreshToken} = await this.refreshToken(email);

            await this.usersRepository.refreshToken(id, refreshToken);

            return {accessToken, refreshToken};
        } catch (err) {
            throw err;
        }
    }

    async accessToken(email: string) {
        try {
            const payload:payload = { email };

            return {
                accessToken: this.jwtService.sign(payload, {secret:'SECRET_KEY', expiresIn: '1m'})
            }
        } catch(err) {
            throw err;
        }
    }

    async refreshToken(email: string) {
        try {
            const payload = {email};

            return {
                refreshToken: this.jwtService.sign(payload, {secret:'SECRET_REFRESH_KEY', expiresIn: '2m'})
            }
        } catch (err) {
            throw err;
        }
    }

    async decode(jwtToken: string) {
        try {
            const {email} = await this.jwtService.verify(jwtToken, {secret: 'SECRET_KEY'});

            return {email};
        } catch (err) {
            switch (err.message) {
                case 'INVALID_TOKEN':
                case 'TOKEN_IS_ARRAY':
                case 'NO_USER':
                    throw new UnauthorizedException('1003');

                case 'jwt expired':
                    throw new GoneException('1010');
                
                default:
                    throw new InternalServerErrorException('1500')
            }
        }   
    }

    async refreshTokenConfirm(resRefreshToken:string, id: string) {
        try {
            const {refreshToken, email} = await this.usersRepository.signIn(id);
        
        if (resRefreshToken !== refreshToken) {
            throw new UnauthorizedException('1030');
        }

        const accessToken = await this.accessToken(email);

        return {accessToken};
        } catch (err) {
            throw err;
        }
    }
}
