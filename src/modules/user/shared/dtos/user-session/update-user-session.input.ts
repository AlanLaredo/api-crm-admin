import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateUserSessionInput } from './create-user-session.input'

@InputType()
export class UpdateUserSessionInput extends PartialType(CreateUserSessionInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
