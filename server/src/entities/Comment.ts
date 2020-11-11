import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Listing } from './Listing'
import { User } from './User'

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

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User
}
