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
            
            const accessToken = await this.accessToken(email);
            
            return accessToken;
        } catch (err) {
            throw err;
        }
    }

    async accessToken(email: string) {
        try {
            const payload:payload = { email };

            return {
                accessToken: this.jwtService.sign(payload)
            }
        } catch(err) {
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
}
