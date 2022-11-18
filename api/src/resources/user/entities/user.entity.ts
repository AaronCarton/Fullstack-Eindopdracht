import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

export enum Role {
  USER = 0,
  DRIVER = 1,
  ADMIN = 2,
}
registerEnumType(Role, { name: 'Role' })

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column({ unique: true })
  uid: string

  @Field(() => Role, { defaultValue: Role.USER })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role

  @Field({ nullable: true })
  @Column()
  street: string

  @Field({ nullable: true })
  @Column()
  houseNumber: string

  @Field({ nullable: true })
  @Column()
  city: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
