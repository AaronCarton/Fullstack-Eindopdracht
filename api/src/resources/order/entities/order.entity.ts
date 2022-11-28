import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

export enum OrderStatus {
  'PENDING' = 'PENDING',
  'COOKING' = 'COOKING',
  'DELIVERING' = 'DELIVERING',
  'DELIVERED' = 'DELIVERED',
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
  @Column()
  items: Pizza[]

  @Field(() => OrderStatus, { defaultValue: OrderStatus.COOKING })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.COOKING })
  status: OrderStatus

  @Field()
  @Column()
  address: string

  @Field()
  @Column({ type: 'timestamp' })
  deliveryTime: Date

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
