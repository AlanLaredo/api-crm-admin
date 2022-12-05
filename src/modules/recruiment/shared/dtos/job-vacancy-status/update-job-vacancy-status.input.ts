import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'
import { CreateJobVacancyStatusInput } from './create-job-vacancy-status.input'

@InputType()
export class UpdateJobVacancyStatusInput extends PartialType(CreateJobVacancyStatusInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
