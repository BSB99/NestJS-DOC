import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorCustoms } from 'src/common/customs/error';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entity/users.entity';
import { UsersRepository } from '../users/repository/users.repository';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { AuthEmail } from './entity/email.entity';
import { EmailRepository } from './Repository/email.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User,AuthEmail], 'testDB_1')],
    controllers: [EmailController],
    providers: [EmailService, UsersRepository, AuthService, JwtService, ErrorCustoms, EmailRepository],
})
export class EmailModule {}
