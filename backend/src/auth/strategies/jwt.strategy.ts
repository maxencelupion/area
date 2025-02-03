import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../models/users/user.service';

export type JwtPayload = {
  email: string;
  userId: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private userService: UserService,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('app.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneId(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Please log to continue');
    }
    return { email: payload.email, userId: payload.userId };
  }
}
