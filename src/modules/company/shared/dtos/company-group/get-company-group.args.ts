import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateCompanyGroupInput } from './update-company-group.input'

@ArgsType()
export class GetCompanyGroupArgs extends IntersectionType(UpdateCompanyGroupInput, BaseArgPagination, ArgsType) {
}
