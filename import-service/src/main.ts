import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*  for the demonstration purposes cors allows fro  all    */

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.connectMicroservice( {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
      queue: 'gateway_queue',
    },
  },)

  await app.listen(8000);
}
bootstrap();
