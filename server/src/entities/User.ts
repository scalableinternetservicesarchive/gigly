import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Listing } from './Listing'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column()
  password: string

  @Column()
  number: string

  @Column()
  location: string

  @Column({
    length: 150,
  })
  about: string

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

  @Column({ nullable: true })
  image: string

  @OneToMany(() => Listing, listing => listing.user, { eager: true })
  @JoinColumn({ name: 'listingId' })
  listings: Listing[]

  // @OneToMany(() => Comment, comment => comment.user, { eager: true })
  // @JoinColumn({ name: 'commentId' })
  // comments: Comment[]
}
