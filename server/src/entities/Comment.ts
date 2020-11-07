import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Listing } from './Listing'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  listingId: number

  @Column()
  username: string

  @Column()
  commentContents: string

  @ManyToOne(() => Listing, listing => listing.comments)
  @JoinColumn({ name: 'listingId_ref' })
  listing: Listing
}
