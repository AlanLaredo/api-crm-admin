import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateJobVacancyStatusInput } from './update-job-vacancy-status.input'

@ArgsType()
export class GetJobVacancyStatusArgs extends IntersectionType(UpdateJobVacancyStatusInput, BaseArgPagination, ArgsType) {
}
