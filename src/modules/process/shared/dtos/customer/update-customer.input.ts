import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateCustomerInput } from './create-customer.input'

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
