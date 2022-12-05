import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateUserPreferencesInput } from './create-user-preferences.input'

@InputType()
export class UpdateUserPreferencesInput extends PartialType(CreateUserPreferencesInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
