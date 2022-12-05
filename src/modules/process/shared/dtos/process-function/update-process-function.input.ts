import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateProcessFunctionInput } from './create-process-function.input'

@InputType()
export class UpdateProcessFunctionInput extends PartialType(CreateProcessFunctionInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
