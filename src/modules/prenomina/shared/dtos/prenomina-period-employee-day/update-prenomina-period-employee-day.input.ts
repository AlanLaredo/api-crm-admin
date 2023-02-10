import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'
import { CreatePrenominaPeriodEmployeeDayInput } from '.'

@InputType()
export class UpdatePrenominaPeriodEmployeeDayInput extends PartialType(CreatePrenominaPeriodEmployeeDayInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
