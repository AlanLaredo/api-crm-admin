import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateCompanyInput } from './create-company.input'

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
