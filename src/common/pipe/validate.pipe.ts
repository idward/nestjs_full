import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class ValidatePipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value:', value);
    console.log('metadata:', JSON.stringify(metadata, null, 2));
    const { error } = this.schema.validate(value);
    console.log(error);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
