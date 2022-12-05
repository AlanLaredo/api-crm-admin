import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateClientInput } from './update-client.input'

@ArgsType()
export class GetClientArgs extends IntersectionType(UpdateClientInput, BaseArgPagination, ArgsType) {
}
