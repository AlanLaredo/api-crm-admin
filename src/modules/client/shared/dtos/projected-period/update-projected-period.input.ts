import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateProjectedPeriodInput } from './create-projected-period.input'

@InputType()
export class UpdateProjectedPeriodInput extends PartialType(CreateProjectedPeriodInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
