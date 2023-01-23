import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreatePrenominaInput } from './create-prenomina.input'

@InputType()
export class UpdatePrenominaInput extends PartialType(CreatePrenominaInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
