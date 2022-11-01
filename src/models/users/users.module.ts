import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/models/auth/auth.service';
import { User } from './entity/users.entity';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'testDB_1')],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, AuthService, JwtService],
    exports: [UsersService,UsersRepository]
})
export class UsersModule {}
