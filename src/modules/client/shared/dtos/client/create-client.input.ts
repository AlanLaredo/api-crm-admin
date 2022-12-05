import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ClientEntity } from 'src/entities/client'

@InputType()
export class CreateClientInput extends OmitType(ClientEntity, IdentityLogEntityProps, InputType) {
}
