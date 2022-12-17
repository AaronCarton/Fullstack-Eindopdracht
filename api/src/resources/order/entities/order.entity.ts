import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { Item } from 'src/resources/item/entities/item.entity'
import { Review } from 'src/resources/review/entities/review.entity'

export enum OrderStatus {
  'PENDING' = 'PENDING',
  'COOKING' = 'COOKING',
  'DELIVERING' = 'DELIVERING',
  'DELIVERED' = 'DELIVERED',
}
registerEnumType(OrderStatus, { name: 'OrderStatus' })
export enum DeliveryType {
  'DELIVERY' = 'DELIVERY',
  'TAKEAWAY' = 'TAKEAWAY',
}
registerEnumType(DeliveryType, { name: 'DeliveryType' })

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

  @Field(() => [Item])
  @Column()
  extras: Item[]

  @Field(() => OrderStatus, { defaultValue: OrderStatus.COOKING })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.COOKING })
  status: OrderStatus

  @Field(() => DeliveryType)
  @Column({ type: 'enum', enum: DeliveryType })
  deliveryType: string

  @Field()
  @Column({ type: 'timestamp' })
  deliveryTime: Date

  @Field()
  @Column()
  address: string

  @Field({ nullable: true })
  @Column()
  lat: number

  @Field({ nullable: true })
  @Column()
  lng: number

  @Field()
  @Column()
  paymentMethod: string
  @Field(() => Review, { nullable: true })
  @Column()
  review: Review

  @Field({ nullable: true })
  @Column()
  reviewId: string

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
