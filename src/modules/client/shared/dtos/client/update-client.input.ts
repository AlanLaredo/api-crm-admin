import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateClientInput } from './create-client.input'

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
