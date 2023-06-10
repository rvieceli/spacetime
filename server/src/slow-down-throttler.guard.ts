import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { EnvironmentVariables } from './environment-variables';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SlowDownThrottlerGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super(options, storageService, reflector);
  }

  async handleRequest(): Promise<boolean> {
    if (!this.configService.get('THROTTLE_API')) {
      const min = 1000;
      const max = 3000;
      const sleepFor = Math.random() * (max - min + 1) + min;

      await new Promise((resolve) => setTimeout(resolve, sleepFor));
    }

    return true;
  }
}
