import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorCustoms } from 'src/common/customs/error';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entity/users.entity';
import { UsersRepository } from '../users/repository/users.repository';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
    imports: [TypeOrmModule.forFeature([User], 'testDB_1')],
    controllers: [EmailController],
    providers: [EmailService, UsersRepository, AuthService, JwtService, ErrorCustoms],
})
export class EmailModule {}
