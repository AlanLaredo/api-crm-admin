import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateNominaInput } from './create-nomina.input'

@InputType()
export class UpdateNominaInput extends PartialType(CreateNominaInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
