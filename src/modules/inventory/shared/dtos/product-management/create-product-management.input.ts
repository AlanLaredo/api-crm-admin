import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ProductManagementEntity } from 'src/entities/inventory'

@InputType()
export class CreateProductManagementInput extends OmitType(ProductManagementEntity, [...IdentityLogEntityProps], InputType) {
}
