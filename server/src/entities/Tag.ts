import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Tag as GraphqlTag, TagType } from '../graphql/schema.types'
import { Listing } from './Listing'

@Entity()
export class Tag extends BaseEntity implements GraphqlTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: TagType, default: TagType.Other })
  type: TagType

  @ManyToOne(() => Listing, listing => listing.tags)
  @JoinColumn({ name: 'listingId' })
  listing: Listing
}
