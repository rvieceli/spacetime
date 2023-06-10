import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MemoryModule } from './memory/memory.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaExceptionsFilter } from './prisma-exceptions.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  EnvironmentVariables,
  EnvironmentVariablesSchema,
} from './environment-variables';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { S3Module } from 'nestjs-s3';
import { ThrottlerModule } from '@nestjs/throttler';
import { SlowDownThrottlerGuard } from './slow-down-throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (config) => EnvironmentVariablesSchema.parse(config),
    }),
    S3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        config: {
          region: configService.get('AWS_REGION'),
          endpoint: configService.get('AWS_ENDPOINT_URL'),
          forcePathStyle: true,
          credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID') as string,
            secretAccessKey: configService.get(
              'AWS_SECRET_ACCESS_KEY',
            ) as string,
          },
        },
      }),
    }),
    PrismaModule,
    MemoryModule,
    UserModule,
    AuthModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: SlowDownThrottlerGuard,
    },
  ],
})
export class AppModule {}
