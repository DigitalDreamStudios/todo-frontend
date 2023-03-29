import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(),
  );

  app.use(cors());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
