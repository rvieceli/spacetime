import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'node:crypto';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import bytes from 'bytes';
import { Request } from 'express';
import { Authenticated } from 'src/auth/guards/jwt-auth.guard';

@Controller('uploads')
export class UploadController {
  @Post()
  @Authenticated()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (request, file, cb) => {
          const id = randomUUID();
          const extension = extname(file.originalname);
          const fileName = `${id}${extension}`;

          cb(null, fileName);
        },
        destination: './uploads',
      }),
    }),
  )
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: (size) => `File size should be less than ${bytes(size)}.`,
          }),
          new FileTypeValidator({
            fileType: /^(image|video)\/[a-zA-Z0-9]+/,
          }),
        ],
        errorHttpStatusCode: 400,
      }),
    )
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const serverUrl = `${request.protocol}://${request.get('host')}`;
    const file_url = new URL(`/uploads/${file.filename}`, serverUrl).toString();

    return { file_url };
  }
}
