import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reservations' })
export class ReservationEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true
  })
  id: number;

  @Column({
    nullable: false,
    width: 255
  })
  name: string

  @Column({
    nullable: false,
    width: 255
  })
  email: string

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => null
  })
  arrivalDate: Date

  @Column({
    type: 'time',
    nullable: false,
    default: () => null
  })
  arrivalTime: Date

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => null
  })
  departureDate: Date

  @Column({
    type: 'time',
    nullable: false,
    default: () => null
  })
  departureTime: Date

  @Column({
    default: () => null,
    nullable: true,
    width: 255
  })
  status: string

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()'
  })
  created_at: Date

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => null,
    onUpdate: 'CURRENT_TIMESTAMP()'
  })
  updated_at: Date

  // Methods
  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

}