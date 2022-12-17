import { InputType, Field } from '@nestjs/graphql'
import { IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator'

@InputType()
export class CreateReviewInput {
  @Field()
  @IsMongoId()
  orderId: string

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @Field({ nullable: true })
  comment: string
}
