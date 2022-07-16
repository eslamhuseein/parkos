import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReservationService } from "@app/reservation/reservation.service";
import { CreateReservationDto } from "@app/reservation/dto/CreateReservationDto";
import { reservationResponseInterface } from "@app/reservation/types/reservationResponse.interface";
import { UpdateReservationDto } from "@app/reservation/dto/UpdateReservationDto";


@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async createReservation(
    @Body('reservation') createReservationDto: CreateReservationDto
  ): Promise<reservationResponseInterface> {
    const reservation = await this.reservationService.createReservation(createReservationDto)

    return this.reservationService.buildReservationResponse(reservation)
  }

  @Get(':id')
  async getSingleReservation(
    @Param('id') id: number
  ): Promise<reservationResponseInterface> {
    const reservation = await this.reservationService.readReservation(id);
    return this.reservationService.buildReservationResponse(reservation);
  }

  @Delete(':id')
  async deleteReservation(
    @Param('id') id: number
  ) {
    return this.reservationService.deleteReservation(id);
  }

  @Put(':id')
  async updateReservation(
    @Param('id') id: number,
    @Body('reservation') updateReservationDto: UpdateReservationDto
  ) {
    const reservation = await this.reservationService.updateReservation(id, updateReservationDto)

    var reservationRes = this.reservationService.buildReservationResponse(reservation)
    
    return reservationRes;
  }
  
}