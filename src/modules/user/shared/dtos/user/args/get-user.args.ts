import { Field, ID, ArgsType, PartialType } from '@nestjs/graphql'
import { IsMongoId, IsOptional } from 'class-validator'
import { Types } from 'mongoose'
import { CreateUserInput } from '../input/create-user.input'

@ArgsType()
export class GetUserArgs extends PartialType(CreateUserInput) {
  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId
}
