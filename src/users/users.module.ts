import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshStrategy } from 'src/strategies/auth.jwt-refresh.strategy';
import { JwtStrategy } from 'src/strategies/auth.jwt.strategy';
import { User } from './entity/users.entity';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'testDB_1')],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, JwtStrategy,  JwtService,  RefreshStrategy]
})
export class UsersModule {}
