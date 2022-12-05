import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateApplicantStatusInput } from './create-applicant-status.input'

@InputType()
export class UpdateApplicantStatusInput extends PartialType(CreateApplicantStatusInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
