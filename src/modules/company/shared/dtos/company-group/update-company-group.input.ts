import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateCompanyGroupInput } from './create-company-group.input'

@InputType()
export class UpdateCompanyGroupInput extends PartialType(CreateCompanyGroupInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
