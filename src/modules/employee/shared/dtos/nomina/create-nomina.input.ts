import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { NominaEntity } from 'src/entities/employee'

@InputType()
export class CreateNominaInput extends OmitType(NominaEntity, IdentityLogEntityProps, InputType) {
}
