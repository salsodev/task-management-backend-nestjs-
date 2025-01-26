import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { UniqueConstraintExceptionFilter } from './utils/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalFilters(new UniqueConstraintExceptionFilter());
  await app.listen(3000);
}
bootstrap();
