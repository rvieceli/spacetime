import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MemoryModule } from './memory/memory.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionsFilter } from './prisma-exceptions.filter';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariablesSchema } from './environment-variables';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (config) => EnvironmentVariablesSchema.parse(config),
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionsFilter,
    },
  ],
})
export class AppModule {}
