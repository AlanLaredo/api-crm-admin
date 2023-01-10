import { InputType, OmitType } from '@nestjs/graphql'
import { IdentityLogEntityProps } from 'src/entities/common'

import { OperationEntity } from 'src/entities/employee'

@InputType()
export class CreateOperationInput extends OmitType(OperationEntity, IdentityLogEntityProps, InputType) {
}
