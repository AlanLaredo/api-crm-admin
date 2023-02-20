import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateProjectedDataInput } from './create-projected-data.input'

@InputType()
export class UpdateProjectedDataInput extends PartialType(CreateProjectedDataInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
