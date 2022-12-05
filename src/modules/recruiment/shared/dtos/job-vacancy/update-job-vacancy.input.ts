import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateJobVacancyInput } from './create-job-vacancy.input'

@InputType()
export class UpdateJobVacancyInput extends PartialType(CreateJobVacancyInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
