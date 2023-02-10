import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { PrenominaPeriodEmployeeDayEntity } from 'src/entities/prenomina'

@InputType()
export class CreatePrenominaPeriodEmployeeDayInput extends OmitType(PrenominaPeriodEmployeeDayEntity, IdentityLogEntityProps, InputType) {
}
