import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateRolePermissionInput } from './update-role-permission.input'

@ArgsType()
export class GetRolePermissionArgs extends IntersectionType(UpdateRolePermissionInput, BaseArgPagination, ArgsType) {
}
