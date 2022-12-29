import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsArray, IsMongoId, IsOptional } from 'class-validator'
import { Types } from 'mongoose'

import { CreateCustomerInput } from './create-customer.input'

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
    emails?: string[]
}
