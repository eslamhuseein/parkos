import { BadRequestException , Inject, Injectable, UseFilters } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { ReservationEntity } from "@app/reservation/reservation.entity";
import { CreateReservationDto } from "@app/reservation/dto/CreateReservationDto";
import { reservationResponseInterface } from "@app/reservation/types/reservationResponse.interface";
import { OrmReservationMethods } from "@app/reservation/methods/orm.methods";
import { UpdateReservationDto } from "@app/reservation/dto/UpdateReservationDto";
import { HttpExceptionFilter } from "@app/libs/errors/http-exception.filter";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { EmailEvent } from "./events/email.event";


@Injectable()
@UseFilters(new HttpExceptionFilter())
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @Inject('EMAIL_SERVICE') private readonly emailService: ClientProxy
  ) { }

  async createReservation(createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
    const newReservation = new ReservationEntity()
    Object.assign(newReservation, createReservationDto)

    let reservationCreated = await this.reservationRepository.save(newReservation)

    if (reservationCreated) {
      let personName = createReservationDto.name;
      let personEmail = createReservationDto.email;
      let status = createReservationDto.status;
      if (status  === "paid") {
        console.log(`sending email to ${personName}`);
        this.emailService.emit<any>('send_email', new EmailEvent(personName, personEmail));
      }
    }

    return reservationCreated
  }

  // read a reservation
  async readReservation(id: number): Promise<ReservationEntity> {
    const reservation = await new OrmReservationMethods(this.reservationRepository).findById(id)

    return reservation
  }

  // delete a reservation
  async deleteReservation(id: number): Promise<DeleteResult> {
    await new OrmReservationMethods(this.reservationRepository).findById(id)

    return await this.reservationRepository.delete({ id })
  }

  // update reservation
  async updateReservation(id: number, updateReservationDto: UpdateReservationDto): Promise<ReservationEntity> {
    const reservation = await new OrmReservationMethods(this.reservationRepository).findById(id)

    Object.assign(reservation, updateReservationDto);

    const saveRes = await this.reservationRepository.save(reservation)

    if (!saveRes) {
      throw new BadRequestException({
        message: 'Reservation is not updated',
      });
    }

    if (saveRes) {
      let personName = updateReservationDto.name;
      let personEmail = updateReservationDto.email;
      let status = updateReservationDto.status;
      if (status  === "paid") {
        console.log(`sending email to ${personName}`);
        this.emailService.emit<any>('send_email', new EmailEvent(personName, personEmail));
      }
    }

    return saveRes;
  }

  buildReservationResponse(reservation: ReservationEntity): reservationResponseInterface {
    return {
      reservation: {
        ...reservation,
      }
    }
  }


}