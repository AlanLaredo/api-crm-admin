import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdatePrenominaPeriodEmployeeInput } from './update-prenomina-period-employee.input'

@ArgsType()
export class GetPrenominaPeriodEmployeeArgs extends IntersectionType(UpdatePrenominaPeriodEmployeeInput, BaseArgPagination, ArgsType) {
}
