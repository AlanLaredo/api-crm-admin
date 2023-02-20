import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateProjectedDataInput } from './update-projected-data.input'

@ArgsType()
export class GetProjectedDataArgs extends IntersectionType(UpdateProjectedDataInput, BaseArgPagination, ArgsType) {
}
