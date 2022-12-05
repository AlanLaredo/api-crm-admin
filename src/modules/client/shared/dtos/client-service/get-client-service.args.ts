import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateClientServiceInput } from './update-client-service.input'

@ArgsType()
export class GetClientServiceArgs extends IntersectionType(UpdateClientServiceInput, BaseArgPagination, ArgsType) {
}
