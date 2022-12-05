import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreatePositionInput } from './create-position.input'

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
