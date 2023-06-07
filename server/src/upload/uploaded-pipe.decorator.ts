import {
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { format } from 'bytes';

export function UploadedFilePipe() {
  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 1024 * 1024 * 5,
          message: (size) => `File size should be less than ${format(size)}.`,
        }),
        new FileTypeValidator({
          fileType: /^(image|video)\/[a-zA-Z0-9]+/,
        }),
      ],
      errorHttpStatusCode: 400,
    }),
  );
}
