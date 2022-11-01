import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/models/auth/auth.service';
import { UsersRepository } from './repository/users.repository';
@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly authService: AuthService,
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
            
            const {accessToken} = await this.authService.accessToken(email);
            const {refreshToken} = await this.authService.refreshToken(email);

            await this.usersRepository.refreshToken(id, refreshToken);

            return {accessToken, refreshToken};
        } catch (err) {
            throw err;
        }
    }
}
