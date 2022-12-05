import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateEmployeeReassignmentInput } from './create-employee-reassignment.input'

@InputType()
export class UpdateEmployeeReassignmentInput extends PartialType(CreateEmployeeReassignmentInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
