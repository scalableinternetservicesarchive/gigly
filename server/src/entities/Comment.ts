import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Listing } from './Listing'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

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

  //for now, we can't query for individual users based on userId in the Popup's comments
  //this is because of the "rendered more hooks than in previous render" problem
  //I think it's because if listings have different numbers of comments, we call the user query a different number of times
  //per listing?

  //so for now, each comment will store the associated user's name and profile photo :/
  @Column()
  username: string

  @Column()
  userPic: string

}
