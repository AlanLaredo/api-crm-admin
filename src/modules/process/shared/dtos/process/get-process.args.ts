import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateProcessInput } from './update-process.input'

@ArgsType()
export class GetProcessArgs extends IntersectionType(UpdateProcessInput, BaseArgPagination, ArgsType) {
}
