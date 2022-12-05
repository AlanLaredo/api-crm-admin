import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateCompanyInput } from './update-company.input'

@ArgsType()
export class GetCompanyArgs extends IntersectionType(UpdateCompanyInput, BaseArgPagination, ArgsType) {
}
