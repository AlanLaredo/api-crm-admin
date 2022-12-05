import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common'
import { UserPreferencesEntity } from 'src/entities/user'

@InputType()
export class CreateUserPreferencesInput extends OmitType(UserPreferencesEntity, [...IdentityLogEntityProps], InputType) {
}
