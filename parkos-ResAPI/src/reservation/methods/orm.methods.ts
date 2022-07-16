import { HttpExceptionFilter } from "@app/libs/errors/http-exception.filter";
import { NotFoundException, UseFilters } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReservationEntity } from "@app/reservation/reservation.entity";


@UseFilters(new HttpExceptionFilter())
export class OrmReservationMethods {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>
  ) { }

  // get reservation by id
  async findById(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.findOne({ id })
    if (!reservation) {
      throw new NotFoundException({
        message: 'Reservation is not exist',
        id: ['Reservation is not exist']
      });
    }

    return reservation
  }

  // get reservation by reservation_id
  async findByReservationId(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.findOne({ id })
    if (!reservation) {
      throw new NotFoundException({
        message: 'Reservation is not exist',
        reservation_id: ['Reservation is not exist']
      });
    }

    return reservation
  }

}