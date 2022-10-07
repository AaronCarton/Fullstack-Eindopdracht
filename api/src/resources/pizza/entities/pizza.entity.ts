import { Topping } from 'src/resources/topping/entities/topping.entity'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Pizza {
  @Field(() => ID, { description: 'MongoDB ObjectID' })
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  type: 'classic' | 'pan'

  @Field()
  @Column()
  size: 'small' | 'medium' | 'large'

  @Field()
  @Column()
  cheesyCrust: boolean

  @Field(() => [Topping], { nullable: true })
  toppings: Topping[]

  @Column()
  toppingsIds: string[]

  // TODO: create base price for each pizza size

  @Field()
  @Column()
  price: number // TODO: calculate price based on toppings

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
