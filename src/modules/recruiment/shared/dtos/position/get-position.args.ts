import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdatePositionInput } from './update-position.input'

@ArgsType()
export class GetPositionArgs extends IntersectionType(UpdatePositionInput, BaseArgPagination, ArgsType) {
}
