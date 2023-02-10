import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreatePrenominaPeriodInput } from './create-prenomina-period.input'

@InputType()
export class UpdatePrenominaPeriodInput extends PartialType(CreatePrenominaPeriodInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
