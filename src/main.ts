import { NestFactory } from '@nestjs/core';
// import {ValidationPipe} from '@nestjs/common'
import { AppModule } from './app.module';
import 'reflect-metadata';
// import { HttpExceptionFilter } from './common/filter/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
