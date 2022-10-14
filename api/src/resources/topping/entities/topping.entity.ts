import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import {
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm'

@Entity()
@ObjectType()
export class Topping {
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
  category: string

  @Field({ nullable: true, defaultValue: false })
  @Column({ default: false })
  default: boolean

  @Field({ nullable: true, defaultValue: 0 })
  @Column({ default: 0 })
  stock: number

  @Field()
  @Column()
  price: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
