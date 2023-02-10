import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { PrenominaConfigurationEntity } from 'src/entities/prenomina'

@InputType()
export class CreatePrenominaConfigurationInput extends OmitType(PrenominaConfigurationEntity, IdentityLogEntityProps, InputType) {
}
