/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { sign } from 'crypto';
import { Strategy } from 'passport-local';
import { OAuthUserDTO } from 'src/modules/user/dto/oauth-user.dto';
import { User } from 'src/modules/user/interfaces/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { TextEncoder } from 'util';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  private readonly JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;

  constructor(
    public readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(email);
    if (!user) {
      throw new UnauthorizedException();
    } else if (password !== user.password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      let user: User = await this.userService.findOneByThirdPartyId(
        thirdPartyId,
        provider,
      );

      if (!user) {
        user = await this.userService.registerOAuthUser(thirdPartyId, provider);
      }
      const payload = {
        userId: user.id,
        access_key: this.JWT_SECRET_KEY,
      };

      const jwt: string = this.jwtService.sign(payload);
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
