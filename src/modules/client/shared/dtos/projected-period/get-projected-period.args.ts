import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateProjectedPeriodInput } from './update-projected-period.input'

@ArgsType()
export class GetProjectedPeriodArgs extends IntersectionType(UpdateProjectedPeriodInput, BaseArgPagination, ArgsType) {
}
