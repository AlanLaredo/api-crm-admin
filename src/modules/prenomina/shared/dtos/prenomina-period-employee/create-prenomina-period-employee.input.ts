import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { PrenominaPeriodEmployeeEntity } from 'src/entities/prenomina'

@InputType()
export class CreatePrenominaPeriodEmployeeInput extends OmitType(PrenominaPeriodEmployeeEntity, IdentityLogEntityProps, InputType) {
}
