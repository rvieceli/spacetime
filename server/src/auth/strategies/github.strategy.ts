import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/environment-variables';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const user = await this.userService.findByGithubId(+profile.id);

    if (user) {
      return user;
    }

    if (!profile.username || !profile.photos?.[0]?.value) {
      throw new BadRequestException('Invalid profile, missing information.');
    }

    return this.userService.create({
      github_id: +profile.id,
      name: profile.displayName,
      avatar_url: profile.photos[0].value,
      login: profile.username,
    });
  }
}
