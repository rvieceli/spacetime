import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: keyof UserModel, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    return data ? request.user[data] : request.user;
  },
);
