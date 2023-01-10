import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateOperationInput } from './create-operation.input'

@InputType()
export class UpdateOperationInput extends PartialType(CreateOperationInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
