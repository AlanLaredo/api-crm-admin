import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateCustomerInput } from './update-customer.input'

@ArgsType()
export class GetCustomerArgs extends IntersectionType(UpdateCustomerInput, BaseArgPagination, ArgsType) {
}
