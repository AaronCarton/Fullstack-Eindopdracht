import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

export enum ItemType {
  'drink' = 'drink',
  'dessert' = 'dessert',
  'special' = 'special',
  'appetizer' = 'appetizer',
}
registerEnumType(ItemType, { name: 'ItemType' })

@ObjectType()
@Entity()
export class Item {
  @Field(() => ID, { description: 'MongoDB ObjectID' })
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  description: string

  @Field(() => ItemType)
  @Column()
  category: ItemType

  @Field(() => Number)
  @Column()
  price: number

  @Field(() => Number)
  @Column()
  stock: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
