import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateMetaConfigurationInput } from './update-meta-configuration.input'

@ArgsType()
export class GetMetaConfigurationArgs extends IntersectionType(UpdateMetaConfigurationInput, BaseArgPagination, ArgsType) {
}
