import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateNominaInput } from './update-nomina.input'

@ArgsType()
export class GetNominaArgs extends IntersectionType(UpdateNominaInput, BaseArgPagination, ArgsType) {
}
