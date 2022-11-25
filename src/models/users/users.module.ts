import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorCustoms } from 'src/common/customs/error';
import { AuthService } from 'src/models/auth/auth.service';
import { AuthEmail } from '../email/entity/email.entity';
import { EmailRepository } from '../email/Repository/email.repository';
import { User } from './entity/users.entity';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,AuthEmail], 'testDB_1')],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, AuthService, JwtService, ErrorCustoms, EmailRepository],
    exports: [UsersService, UsersRepository]
})
export class UsersModule {}
