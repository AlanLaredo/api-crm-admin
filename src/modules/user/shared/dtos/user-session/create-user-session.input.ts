import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common'
import { UserSessionEntity } from 'src/entities/user'

@InputType()
export class CreateUserSessionInput extends OmitType(UserSessionEntity, [...IdentityLogEntityProps], InputType) {
}
