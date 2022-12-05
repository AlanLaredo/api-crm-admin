import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateActionLogInput } from './create-action-log.input'

@InputType()
export class UpdateActionLogInput extends PartialType(CreateActionLogInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
