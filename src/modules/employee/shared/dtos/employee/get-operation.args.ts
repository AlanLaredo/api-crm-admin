import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateOperationInput } from './update-operation.input'

@ArgsType()
export class GetOperationArgs extends IntersectionType(UpdateOperationInput, BaseArgPagination, ArgsType) {
}
