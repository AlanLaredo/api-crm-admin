import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdatePrenominaConfigurationInput } from './update-prenomina-configuration.input'

@ArgsType()
export class GetPrenominaConfigurationArgs extends IntersectionType(UpdatePrenominaConfigurationInput, BaseArgPagination, ArgsType) {
}
