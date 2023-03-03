import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //ini untuk pipevalidation global
  const port = process.env.PORT || 5000;
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useStaticAssets(process.env.UPLOAD_PATH, {
    prefix: '/uploads',
  });

  await app.listen(port, () =>
    console.log(`server is running on port ${port}`),
  );
}
bootstrap();
