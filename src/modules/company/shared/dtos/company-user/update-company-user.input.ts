import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateCompanyUserInput } from './create-company-user.input'

@InputType()
export class UpdateCompanyUserInput extends PartialType(CreateCompanyUserInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
