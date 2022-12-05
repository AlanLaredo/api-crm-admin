import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateProcessFunctionInput } from './update-process-function.input'

@ArgsType()
export class GetProcessFunctionArgs extends IntersectionType(UpdateProcessFunctionInput, BaseArgPagination, ArgsType) {
}
