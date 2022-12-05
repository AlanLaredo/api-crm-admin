import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ProcessEntity } from 'src/entities/process'

@InputType()
export class CreateProcessInput extends OmitType(ProcessEntity, IdentityLogEntityProps, InputType) {
}
