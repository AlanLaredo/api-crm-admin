import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateUserInput } from './update-user.input'

@ArgsType()
export class GetUserArgs extends IntersectionType(UpdateUserInput, BaseArgPagination, ArgsType) {
}
