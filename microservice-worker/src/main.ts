import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule);
  await app.listenAsync();
}
bootstrap();