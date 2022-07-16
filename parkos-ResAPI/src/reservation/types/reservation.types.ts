import { ReservationEntity } from "@app/reservation/reservation.entity";

export type ReservationType = Omit<ReservationEntity, 'updateTimestamp'>;