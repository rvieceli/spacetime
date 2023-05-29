import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/environment-variables';
import { UserService } from 'src/user/user.service';
import { JwtTokenPayload } from './dto/jwt-token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async getToken(user: Express.User): Promise<string> {
    const payload: JwtTokenPayload = {
      sub: user.id,
      name: user.name,
      avatar_url: user.avatar_url,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }

  async login() {
    return 'login';
  }
}
