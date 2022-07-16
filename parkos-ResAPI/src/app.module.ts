import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { HttpExceptionFilter } from '@app/libs/errors/http-exception.filter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReservationModule } from '@app/reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ReservationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {

}
