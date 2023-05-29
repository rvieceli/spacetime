import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export function Authenticated() {
  return UseGuards(JwtAuthGuard);
}
