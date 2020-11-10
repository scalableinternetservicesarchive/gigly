import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Comment } from './Comment'
import { Listing } from './Listing'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @OneToMany(() => Listing, listing => listing.user, { eager: true })
  @JoinColumn({ name: 'listingId' })
  listings: Listing[]

  @OneToMany(() => Comment, comment => comment.user, { eager: true })
  @JoinColumn({ name: 'commentId' })
  comments: Comment[]
}
