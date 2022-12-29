import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { OmitType } from '@nestjs/graphql/dist/type-helpers'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateCustomerInput } from './update-customer.input'

@ArgsType()
export class GetCustomerArgs extends OmitType(IntersectionType(UpdateCustomerInput, BaseArgPagination, ArgsType), ['emails'], ArgsType) {
}
