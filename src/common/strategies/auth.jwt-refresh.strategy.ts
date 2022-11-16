import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "src/models/auth/auth.service";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_REFRESH_KEY',
      // Refresh Token에 접근을 해야 하므로 true 설정
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    try {
        const refreshToken = req.get('authorization').split('Bearer ')[1];
        const {email} = req.body;

        return await this.authService.refreshTokenConfirm(refreshToken, email);
    } catch (err) {
        throw err;
    }
    
  }
}