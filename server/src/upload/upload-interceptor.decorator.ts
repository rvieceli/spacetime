import {
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { format } from 'bytes';
import { Request } from 'express';

const maxFileSizeValidator = new MaxFileSizeValidator({
  maxSize: 1024 * 1024 * 1.7,
  message: (size) => `File size should be less than ${format(size)}.`,
});

const fileTypeValidator = new FileTypeValidator({
  fileType: /^(image|video)\/[a-zA-Z0-9]+/,
});

export function UseUploadInterceptor(
  fieldName = 'file',
  destination = './uploads',
) {
  return UseInterceptors(
    FileInterceptor(fieldName, {
      storage: diskStorage({
        filename: (request, file, cb) => {
          const id = randomUUID();
          const extension = extname(file.originalname);
          const fileName = `${id}${extension}`;

          cb(null, fileName);
        },
        destination,
      }),
      fileFilter: (request: Request, file, cb) => {
        const size = request.headers['content-length'];

        if (!maxFileSizeValidator.isValid({ size })) {
          return cb(
            new BadRequestException(maxFileSizeValidator.buildErrorMessage()),
            false,
          );
        }

        if (!fileTypeValidator.isValid(file)) {
          return cb(
            new BadRequestException('Only images and videos are allowed'),
            false,
          );
        }

        cb(null, true);
      },
    }),
  );
}
