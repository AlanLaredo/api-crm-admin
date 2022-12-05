import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreateMetaConfigurationInput } from './create-meta-configuration.input'

@InputType()
export class UpdateMetaConfigurationInput extends PartialType(CreateMetaConfigurationInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
