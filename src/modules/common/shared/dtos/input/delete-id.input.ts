import { InputType, Field, ID } from '@nestjs/graphql'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

@InputType()
export class DeleteIDInput {
  @IsNotEmpty()
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
