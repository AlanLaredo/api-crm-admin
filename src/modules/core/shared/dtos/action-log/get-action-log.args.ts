import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateActionLogInput } from './update-action-log.input'

@ArgsType()
export class GetActionLogArgs extends IntersectionType(UpdateActionLogInput, BaseArgPagination, ArgsType) {
}
