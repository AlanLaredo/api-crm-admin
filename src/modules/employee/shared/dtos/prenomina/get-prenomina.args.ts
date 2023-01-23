import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdatePrenominaInput } from './update-prenomina.input'

@ArgsType()
export class GetPrenominaArgs extends IntersectionType(UpdatePrenominaInput, BaseArgPagination, ArgsType) {
}
