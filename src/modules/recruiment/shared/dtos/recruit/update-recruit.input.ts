import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateRecruitInput } from './create-recruit.input'

@InputType()
export class UpdateRecruitInput extends PartialType(CreateRecruitInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
