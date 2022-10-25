import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { JwtStrategy } from 'src/strategies/auth.jwt.strategy';
import { User } from './entity/users.entity';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'testDB_1'), 
    JwtModule.register({
    // .env에 보관
    secret: 'SECRET_KEY',
    
    // 토큰 유효 기간
    signOptions: { expiresIn: '1m'}
  }) 
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, JwtStrategy, JwtAuthGuard]
})
export class UsersModule {}
