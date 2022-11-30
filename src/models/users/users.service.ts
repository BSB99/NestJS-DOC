import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/models/auth/auth.service';
import { UsersRepository } from './repository/users.repository';
import * as bcrypt from 'bcrypt';
import { EmailRepository } from '../email/Repository/email.repository';
import { InjectDataSource } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly authService: AuthService,
        private readonly emailRepository: EmailRepository,
    ){}

    async signIn({email, password}) {
        try {
            const userInfo = await this.usersRepository.signIn(email);
            
            if (userInfo === null) {
                throw new NotFoundException(1000);
            }

            const {no, salt, active} = userInfo;

            const passwordConfirm = await bcrypt.compare(password, salt);
            
            if (!passwordConfirm) {
                throw new UnauthorizedException(1003);
            }

            if (!active) {
                throw new UnauthorizedException(1005);
            }
            
            const accessToken = await this.authService.issuanceToken({no, email},
                {
                    key: 'ACCESS_KEY', 
                    expiresin: 'ACCESS_KEY_EXPIRESIN'
                }
            );
            const refreshToken = await this.authService.issuanceToken({no, email}, 
                {
                    key: 'REFRESH_KEY', 
                    expiresin: 'REFRESH_KEY_EXPIRESIN'
                }
            );
            
            await this.usersRepository.refreshToken(email, refreshToken);

            return {accessToken, refreshToken};
        } catch (err) {
            throw err;
        }
    }

    async signUp(signUpDto) {
        try {
            const userConfirm = await this.usersRepository.userConfirm(signUpDto.email);
            if (userConfirm) {
                throw new BadRequestException(1001);
            }
            
            const salts = await bcrypt.genSalt();
            signUpDto.password = await bcrypt.hash(signUpDto.password, salts);

            await this.usersRepository.signUp(signUpDto);
        } catch (err) {
            throw err;
        }
    }

    async userInfo(no:number) {
        try {
            const userInfo = await this.usersRepository.userInfo(no);

            return userInfo;
        } catch (err) {
            throw err;
        }
    }

    async emailVerification(uuid:string) {
        try {
            const {userNo} = await this.emailRepository.uuidVerification(uuid);
            
            await this.usersRepository.emailVerification(userNo);
        } catch (err) {
            throw err;
        }
    }
}
