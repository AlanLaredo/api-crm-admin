import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { PositionEntity } from 'src/entities/recruiment'

@InputType()
export class CreatePositionInput extends OmitType(PositionEntity, IdentityLogEntityProps, InputType) {
}
