import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateUserSessionInput } from './update-user-session.input'

@ArgsType()
export class GetUserSessionArgs extends IntersectionType(UpdateUserSessionInput, BaseArgPagination, ArgsType) {
}
