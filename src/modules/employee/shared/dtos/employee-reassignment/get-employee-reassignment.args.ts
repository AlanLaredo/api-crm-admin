import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateEmployeeReassignmentInput } from './update-employee-reassignment.input'

@ArgsType()
export class GetEmployeeReassignmentArgs extends IntersectionType(UpdateEmployeeReassignmentInput, BaseArgPagination, ArgsType) {
}
