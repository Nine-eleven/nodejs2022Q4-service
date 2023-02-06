import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ErrorInterceptor());
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
