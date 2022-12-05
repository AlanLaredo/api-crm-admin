import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { RolePermissionEntity } from 'src/entities/user'

@InputType()
export class CreateRolePermissionInput extends OmitType(RolePermissionEntity, IdentityLogEntityProps, InputType) {
}
