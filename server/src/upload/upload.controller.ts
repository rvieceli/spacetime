import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UseUploadInterceptor } from './upload-interceptor.decorator';
import { UploadedFilePipe } from './uploaded-pipe.decorator';
import { InjectS3, S3 } from 'nestjs-s3';
import { Authenticated } from 'src/auth/guards/jwt-auth.guard';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/environment-variables';
import { randomUUID } from 'crypto';
import * as mime from 'mime';

const UPLOAD_MAX_FILE_SIZE = 1024 * 1024 * 5; // 10MB
@Controller('uploads')
export class UploadController {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Post()
  @Authenticated()
  @UseUploadInterceptor()
  upload(
    @UploadedFilePipe()
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const serverUrl = `${request.protocol}://${request.get('host')}`;
    const file_url = new URL(`/uploads/${file.filename}`, serverUrl).toString();

    return { file_url };
  }

  @Post('sign')
  @Authenticated()
  async sign(@Body('contentType') contentType: string) {
    if (
      !contentType ||
      !['image', 'video'].some((type) => contentType.startsWith(type))
    ) {
      throw new BadRequestException('contentType must be image or video.');
    }

    const fileName = `${randomUUID()}.${mime.getExtension(contentType)}`;

    const signature = await createPresignedPost(this.s3, {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME') as string,
      Key: fileName,
      Fields: {
        key: fileName,
      },
      Conditions: [
        ['starts-with', '$Content-Type', 'image/,video/'],
        ['content-length-range', 1, UPLOAD_MAX_FILE_SIZE],
      ],
    });

    return {
      ...signature,
      file_url: `${signature.url}/${signature.fields.key}`,
    };
  }
}
