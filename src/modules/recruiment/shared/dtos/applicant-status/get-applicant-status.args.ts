import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateApplicantStatusInput } from './update-applicant-status.input'

@ArgsType()
export class GetApplicantStatusArgs extends IntersectionType(UpdateApplicantStatusInput, BaseArgPagination, ArgsType) {
}
