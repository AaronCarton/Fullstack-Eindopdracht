import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Order } from 'src/resources/order/entities/order.entity'

@Entity()
@ObjectType()
export class Review {
  @Field(() => ID, { description: 'MongoDB ObjectID' })
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  customerId: string

  @Field()
  @Column()
  orderId: string

  @Field(() => Order)
  order: Order

  @Field()
  @Column()
  rating: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
