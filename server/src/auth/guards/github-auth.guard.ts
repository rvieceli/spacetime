import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from 'passport-github';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  handleRequest<TUser = Profile>(
    err: unknown,
    user: TUser,
    info: unknown,
    context: ExecutionContext,
    status?: unknown,
  ): TUser {
    if (err instanceof Error) {
      throw new BadRequestException(err.message);
    }
    return user;
  }
}
