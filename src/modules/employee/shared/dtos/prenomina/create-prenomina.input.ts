import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { PrenominaEntity } from 'src/entities/employee'

@InputType()
export class CreatePrenominaInput extends OmitType(PrenominaEntity, IdentityLogEntityProps, InputType) {
}
