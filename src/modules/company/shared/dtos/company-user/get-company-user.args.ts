import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateCompanyUserInput } from './update-company-user.input'

@ArgsType()
export class GetCompanyUserArgs extends IntersectionType(UpdateCompanyUserInput, BaseArgPagination, ArgsType) {
}
