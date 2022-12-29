import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { CustomerEntity } from 'src/entities/process'

@InputType()
export class CreateCustomerInput extends OmitType(CustomerEntity, [...IdentityLogEntityProps, 'emails', 'client', 'process'], InputType) {
}
