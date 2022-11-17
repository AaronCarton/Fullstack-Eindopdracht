import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

export enum OrderStatus {
  'PENDING' = 'PENDING',
  'COOKING' = 'COOKING',
  'DELIVERING' = 'DELIVERING',
  'DELIVERED' = 'delivered',
}
registerEnumType(OrderStatus, { name: 'OrderStatus' })

@Entity()
@ObjectType()
export class Order {
  @Field(() => ID, { description: 'MongoDB ObjectID' })
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  customerId: string

  @Field(() => [Pizza])
  items: Pizza[]

  @Column()
  itemsIds: string[]

  @Field(() => OrderStatus)
  @Column()
  status: OrderStatus

  // TODO: add service fees price

  @Field()
  total: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
