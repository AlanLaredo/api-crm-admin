import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreatePrenominaPeriodEmployeeInput } from './create-prenomina-period-employee.input'

@InputType()
export class UpdatePrenominaPeriodEmployeeInput extends PartialType(CreatePrenominaPeriodEmployeeInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
