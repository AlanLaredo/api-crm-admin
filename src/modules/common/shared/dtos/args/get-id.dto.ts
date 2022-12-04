import { ArgsType, Field, ID } from '@nestjs/graphql'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

@ArgsType()
export class GetIDArgs {
  @IsNotEmpty()
  @IsMongoId()
  @Field(type => ID)
    id!: Types.ObjectId
}
