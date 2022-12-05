import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common'
import { UserRoleEntity } from 'src/entities/user'

@InputType()
export class CreateUserRoleInput extends OmitType(UserRoleEntity, [...IdentityLogEntityProps], InputType) {
}
