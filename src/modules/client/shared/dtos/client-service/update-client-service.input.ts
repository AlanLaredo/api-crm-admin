import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateClientServiceInput } from './create-client-service.input'

@InputType()
export class UpdateClientServiceInput extends PartialType(CreateClientServiceInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
