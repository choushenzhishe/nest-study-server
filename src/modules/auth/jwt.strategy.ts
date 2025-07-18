import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JWT_SECRET } from '@/common/constants/aliyun';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(user: any) {
    // const user = await this.authService.validateUserByJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
