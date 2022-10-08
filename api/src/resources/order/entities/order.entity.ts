import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

@Entity()
@ObjectType()
export class Order {
  @Field(() => ID, { description: 'MongoDB ObjectID' })
  @ObjectIdColumn()
  id: ObjectId

  @Field(() => [Pizza])
  @Column(() => Pizza)
  items: Pizza[]

  @Field()
  @Column()
  status: 'pending' | 'cooking' | 'delivering' | 'delivered'

  // TODO: add service fees price

  @Field()
  totalPrice: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
