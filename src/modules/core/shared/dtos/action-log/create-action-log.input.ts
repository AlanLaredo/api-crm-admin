import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ActionLogEntity } from 'src/entities/core'

@InputType()
export class CreateActionLogInput extends OmitType(ActionLogEntity, IdentityLogEntityProps, InputType) {
}
