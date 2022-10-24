import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './repository/users.repository';
import { payload } from './security/payload';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signIn(userInfo) {
        try {
            const {email} = await this.usersRepository.signIn(userInfo);
            const accessToken = this.accessToken(email);
            
            return accessToken;
        } catch (err) {
            throw err;
        }
    }

    async accessToken(email) {
        try {
            const payload:payload = {email};
            return {
                accessToken: this.jwtService.sign(payload)
            }
        } catch(err) {
            throw err;
        }
    }
}
