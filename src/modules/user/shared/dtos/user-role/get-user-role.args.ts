import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateUserRoleInput } from './update-user-role.input'

@ArgsType()
export class GetUserRoleArgs extends IntersectionType(UpdateUserRoleInput, BaseArgPagination, ArgsType) {
}
