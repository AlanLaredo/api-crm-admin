import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateUserRoleInput } from './create-user-role.input'

@InputType()
export class UpdateUserRoleInput extends PartialType(CreateUserRoleInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
