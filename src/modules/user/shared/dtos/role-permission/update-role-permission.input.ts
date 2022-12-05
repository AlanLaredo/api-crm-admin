import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateRolePermissionInput } from './create-role-permission.input'

@InputType()
export class UpdateRolePermissionInput extends PartialType(CreateRolePermissionInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
