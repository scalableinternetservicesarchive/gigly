import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Listing } from './Listing'

export enum TagType {
  GROCERIES = 'groceries',
  TUTORING = 'tutoring',
  HAIRCUT = 'haircut',
  OTHER = 'other',
}

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: TagType, default: TagType.OTHER })
  type: TagType

  @ManyToOne(() => Listing, listing => listing.tags)
  @JoinColumn({ name: 'listingId' })
  listing: Listing
}
