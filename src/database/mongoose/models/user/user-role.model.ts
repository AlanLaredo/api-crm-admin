import { ModelDefinition } from '@nestjs/mongoose'

import { UserRoleEntity, UserRoleSchema } from 'src/entities/user'

export const UserRoleModel: ModelDefinition = {
  name: UserRoleEntity.name,
  schema: UserRoleSchema
}
