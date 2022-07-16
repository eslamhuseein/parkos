import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservationEntity } from "@app/reservation/reservation.entity";
import { ReservationController } from "@app/reservation/reservation.controller";
import { ReservationService } from "@app/reservation/reservation.service";
import { createReservationMiddleware } from "@app/reservation/middleware/createReservation";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]),
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE', transport: Transport.RMQ,
        options: {
          urls: [`amqp://guest:guest@${process.env.RABBITQM_SERVER}:5672`],
          queue: 'reservation-messages',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})

export class ReservationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(createReservationMiddleware)
    .forRoutes(
      { path: 'reservation', method: RequestMethod.POST },
      { path: 'reservation/*', method: RequestMethod.PUT },
    );
  }
}