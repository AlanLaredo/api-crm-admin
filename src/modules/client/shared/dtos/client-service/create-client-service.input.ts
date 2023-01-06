import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ClientServiceEntity } from 'src/entities/client'

@InputType()
export class CreateClientServiceInput extends OmitType(ClientServiceEntity, [...IdentityLogEntityProps, 'client'], InputType) {
}
