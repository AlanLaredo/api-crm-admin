import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdatePrenominaPeriodEmployeeDayInput } from '.'

@ArgsType()
export class GetPrenominaPeriodEmployeeDayArgs extends IntersectionType(UpdatePrenominaPeriodEmployeeDayInput, BaseArgPagination, ArgsType) {
}
