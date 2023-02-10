import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

import { CreatePrenominaConfigurationInput } from './create-prenomina-configuration.input'

@InputType()
export class UpdatePrenominaConfigurationInput extends PartialType(CreatePrenominaConfigurationInput) {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId
}
