import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Listing } from './Listing'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  commentContents: string

  @ManyToOne(() => Listing, listing => listing.comments)
  @JoinColumn({ name: 'listingId_ref' })
  listing: Listing

  //Maybe we'll add this join relation back in, but for now, it causes cylical eagerly loading
  // @ManyToOne(() => User, user => user.comments)
  // @JoinColumn({ name: 'userId' })
  // user: User

  //replacing user with userId
  @Column()
  userId: number
}
