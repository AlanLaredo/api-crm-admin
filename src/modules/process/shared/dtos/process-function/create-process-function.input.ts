import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ProcessFunctionEntity } from 'src/entities/process'

@InputType()
export class CreateProcessFunctionInput extends OmitType(ProcessFunctionEntity, IdentityLogEntityProps, InputType) {
}
