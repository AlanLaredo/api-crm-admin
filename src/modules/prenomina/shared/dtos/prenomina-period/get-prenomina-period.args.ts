import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdatePrenominaPeriodInput } from './update-prenomina-period.input'

@ArgsType()
export class GetPrenominaPeriodArgs extends IntersectionType(UpdatePrenominaPeriodInput, BaseArgPagination, ArgsType) {
}
