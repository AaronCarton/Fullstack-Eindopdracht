import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'

export enum ToppingCategory {
  'MEAT' = 'MEAT',
  'VEGETABLE' = 'VEGETABLE',
  'CHEESE' = 'CHEESE',
  'SAUCE' = 'SAUCE',
  'OTHER' = 'OTHER',
}
registerEnumType(ToppingCategory, { name: 'ToppingCategory' })

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

  @Field(() => ToppingCategory)
  @Column()
  category: ToppingCategory

  @Field({ nullable: true })
  default: boolean // will be filled in by PizzaService's topping resolver

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
