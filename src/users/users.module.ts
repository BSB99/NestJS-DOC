import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    signOptions: { expiresIn: '60d'}
  }) 
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository]
})
export class UsersModule {}
