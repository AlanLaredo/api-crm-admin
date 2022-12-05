import { ArgsType, Field, ID } from '@nestjs/graphql'
import { IsArray, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

@ArgsType()
export class GetIDSArgs {
  @IsNotEmpty()
  @IsArray()
  @Field(() => [ID])
    ids!: Types.ObjectId[]
}
