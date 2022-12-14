import { Topping } from 'src/resources/topping/entities/topping.entity'
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

export enum PizzaType {
  'classic' = 'classic',
  'pan' = 'pan',
  'cheesyCrust' = 'cheesyCrust',
}
export enum PizzaSize {
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
}
registerEnumType(PizzaType, { name: 'PizzaType' })
registerEnumType(PizzaSize, { name: 'PizzaSize' })

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

  @Field(() => PizzaType, { nullable: true })
  @Column()
  type: PizzaType

  @Field({ defaultValue: true })
  default: boolean

  @Field(() => PizzaSize, { nullable: true })
  @Column()
  size: PizzaSize

  @Field(() => [Topping])
  toppings: Topping[]

  @Column()
  toppingsIds: string[]

  @Field()
  @Column()
  basePrice: number // TODO: create base price for each pizza size

  @Field(() => Number)
  price: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
