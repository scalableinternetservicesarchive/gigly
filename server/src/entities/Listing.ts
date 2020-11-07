import { int } from 'aws-sdk/clients/datapipeline'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ type: 'int', name: 'price', nullable: true })
  price: int | null

  @Column()
  sellingName: string

  @Column()
  startDate: string

  @Column()
  endDate: string

  @Column()
  location: string

  @Column()
  description: string

  @Column()
  image: string
}
