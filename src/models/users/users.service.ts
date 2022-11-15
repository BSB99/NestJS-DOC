import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/models/auth/auth.service';
import { UsersRepository } from './repository/users.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly authService: AuthService,
    ){}

    async signIn({id, password}) {
        try {
            const userInfo = await this.usersRepository.signIn(id);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            }

            const {email, salt} = userInfo;

            const passwordConfirm = await bcrypt.compare(password, salt);
            
            if (!passwordConfirm) {
                throw new UnauthorizedException(1003);
            }
            
            const accessToken = await this.authService.issuanceToken({email, id},
                {
                    key: 'ACCESS_KEY', 
                    expiresin: 'ACCESS_KEY_EXPIRESIN'
                }
            );
            const refreshToken = await this.authService.issuanceToken({email}, 
                {
                    key: 'REFRESH_KEY', 
                    expiresin: 'REFRESH_KEY_EXPIRESIN'
                }
            );
            
            await this.usersRepository.refreshToken(id, refreshToken);

            return {accessToken, refreshToken};
        } catch (err) {
            throw err;
        }
    }

    async signUp(signUpDto) {
        try {
            const emailConfirm = await this.usersRepository.emailConfirm(signUpDto.email);
            if (emailConfirm) {
                throw new BadRequestException(1001);
            }

            const idConfirm = await this.usersRepository.idConfirm(signUpDto.id);
            if (idConfirm) {
                throw new BadRequestException(1001);
            }

            const salts = await bcrypt.genSalt();
            signUpDto.password = await bcrypt.hash(signUpDto.password, salts);

            await this.usersRepository.signUp(signUpDto);
        } catch (err) {
            throw err;
        }
    }
}
