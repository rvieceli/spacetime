import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { Authenticated } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/github')
  @UseGuards(GithubAuthGuard)
  async login(@User() user: Express.User) {
    const access_token = await this.authService.getToken(user);

    return { access_token };
  }

  @Get('profile')
  @Authenticated()
  async profile(@User() user: Express.User) {
    return user;
  }
}
