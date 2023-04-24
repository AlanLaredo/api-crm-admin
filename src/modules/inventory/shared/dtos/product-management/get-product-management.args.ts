import { ArgsType, IntersectionType } from '@nestjs/graphql'

import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateProductManagementInput } from './update-product-management.input'

@ArgsType()
export class GetProductManagementArgs extends IntersectionType(UpdateProductManagementInput, BaseArgPagination, ArgsType) {
}
