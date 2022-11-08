import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorCustoms } from 'src/common/customs/error';
import { RefreshStrategy } from 'src/common/strategies/auth.jwt-refresh.strategy';
import { JwtStrategy } from 'src/common/strategies/auth.jwt.strategy';
import { User } from 'src/models/users/entity/users.entity';
import { UsersRepository } from 'src/models/users/repository/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'testDB_1')],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy,  JwtService,  RefreshStrategy, UsersRepository, ErrorCustoms],
  exports: [AuthService]
})
export class AuthModule {}
