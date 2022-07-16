if (!process.env.IS_TS_NODE) {
  require ('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@app/libs/errors/typeorm.error.filter'
import { HttpExceptionFilter } from '@app/libs/errors/http-exception.filter';
import { ApiConfigService } from '@app/config/config.service';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = new ApiConfigService().getAppPort; // get app port

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'reservation-messages',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}
bootstrap();
