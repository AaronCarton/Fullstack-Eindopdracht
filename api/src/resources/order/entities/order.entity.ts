import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

export enum OrderStatus {
  'pending' = 'pending',
  'cooking' = 'cooking',
  'delivering' = 'delivering',
  'delivered' = 'delivered',
}
registerEnumType(OrderStatus, { name: 'OrderStatus' })

@Entity()
@ObjectType()
export class Order {
  @Field(() => ID, { description: 'MongoDB ObjectID' })
  @ObjectIdColumn()
  id: ObjectId

  @Field(() => [Pizza])
  @Column(() => Pizza)
  items: Pizza[]

  @Field(() => OrderStatus)
  @Column()
  status: OrderStatus

  @Field()
  totalPrice: number // TODO: add service fees price

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
