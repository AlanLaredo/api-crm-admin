import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateRecruitInput } from './update-recruit.input'

@ArgsType()
export class GetRecruitArgs extends IntersectionType(UpdateRecruitInput, BaseArgPagination, ArgsType) {
}
