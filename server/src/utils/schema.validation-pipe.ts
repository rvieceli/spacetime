import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import { RequireAtLeastOne } from 'type-fest';
import { Schema, ZodError, ZodType } from 'zod';

type ParamtypeSchema<T extends Schema> = RequireAtLeastOne<
  Record<Paramtype, T>,
  Paramtype
>;

@Injectable()
export class SchemaValidationPipe<T extends Schema> implements PipeTransform {
  constructor(bodySchema: T);
  constructor(paramtypeSchema: ParamtypeSchema<T>);
  constructor(private schemas: T | ParamtypeSchema<T>) {}

  transform<V = unknown>(
    value: V,
    metadata: ArgumentMetadata,
  ): ZodType<T['_output']> | V {
    let schema: T | undefined = undefined;

    // default to body
    if (this.schemas instanceof Schema) {
      if (metadata.type === 'body') {
        schema = this.schemas;
      }
    } else {
      schema = this.schemas[metadata.type];
    }

    if (!schema) {
      return value;
    }

    try {
      return schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues, 'Validation failed');
      }
      throw error;
    }
  }
}
