import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateProductManagementInput } from './create-product-management.input'

@InputType()
export class UpdateProductManagementInput extends PartialType(CreateProductManagementInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
