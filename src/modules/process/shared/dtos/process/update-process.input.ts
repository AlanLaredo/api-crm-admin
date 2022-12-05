import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateProcessInput } from './create-process.input'

@InputType()
export class UpdateProcessInput extends PartialType(CreateProcessInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
