import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { MetaConfigurationEntity } from 'src/entities/core'

@InputType()
export class CreateMetaConfigurationInput extends OmitType(MetaConfigurationEntity, IdentityLogEntityProps, InputType) {
}
