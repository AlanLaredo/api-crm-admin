import { Field, ID, ArgsType, PartialType, Int } from '@nestjs/graphql'
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'
import { UpdateUserInput } from '../input/update-user.input'

// @ArgsType()
// export class BaseArgPagination {

//   @Field((type) => Int)
//     offset: number = 0

//   @Field((type) => Int)
//     limit: number = 10
// }

@ArgsType()
export class GetUserArgs extends PartialType(UpdateUserInput, ArgsType) {
}
