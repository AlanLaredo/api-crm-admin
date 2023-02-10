import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { PrenominaPeriodEntity } from 'src/entities/prenomina'

@InputType()
export class CreatePrenominaPeriodInput extends OmitType(PrenominaPeriodEntity, IdentityLogEntityProps, InputType) {
}
