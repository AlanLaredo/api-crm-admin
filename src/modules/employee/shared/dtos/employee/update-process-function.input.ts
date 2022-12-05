import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateEmployeeInput } from './create-employee.input'

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
