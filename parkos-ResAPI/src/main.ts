if (!process.env.IS_TS_NODE) {
  require ('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@app/libs/errors/typeorm.error.filter'
import { HttpExceptionFilter } from '@app/libs/errors/http-exception.filter';
import { ApiConfigService } from '@app/config/config.service';

async function bootstrap() {
  const port = new ApiConfigService().getAppPort; // get app port
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port)
}
bootstrap();
