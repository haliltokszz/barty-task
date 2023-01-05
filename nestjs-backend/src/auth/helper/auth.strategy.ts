/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthHelper } from './auth.helper';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entity/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_KEY'),
      ignoreExpiration: false,
    });
  }

  private validate(payload: string): Promise<User | never> {
    return this.helper.validateUser(payload);
  }
}
