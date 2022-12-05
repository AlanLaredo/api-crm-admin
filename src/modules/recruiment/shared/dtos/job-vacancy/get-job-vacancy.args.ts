import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateJobVacancyInput } from './update-job-vacancy.input'

@ArgsType()
export class GetJobVacancyArgs extends IntersectionType(UpdateJobVacancyInput, BaseArgPagination, ArgsType) {
}
