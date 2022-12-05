import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateEmployeeInput } from './update-employee.input'

@ArgsType()
export class GetEmployeeArgs extends IntersectionType(UpdateEmployeeInput, BaseArgPagination, ArgsType) {
}
