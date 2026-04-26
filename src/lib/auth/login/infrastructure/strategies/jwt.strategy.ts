import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { AuthUser } from '../types/auth-user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SUPER_SECRET_KEY',
    });
  }

  validate(payload: JwtPayload): AuthUser {
    return {
      id: payload.sub, // 🔥 aquí está la clave
      userName: payload.userName,
      rol: payload.rol,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
  }
}
