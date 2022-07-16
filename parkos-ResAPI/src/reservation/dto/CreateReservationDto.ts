import { IsEmpty, IsISO8601, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto { 
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly email: string

  @IsNotEmpty()
  @IsISO8601()
  readonly arrivalDate: string

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly arrivalTime: string

  @IsNotEmpty()
  @IsISO8601()
  readonly departureDate: string

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly departureTime: string
  
  readonly status: string

}