import { ModelDefinition } from '@nestjs/mongoose'
import { UserRoleEntity } from 'src/entities/user'
import { UserRoleSchema } from 'src/entities/user/user_role.entity'

export const UserRoleModel: ModelDefinition = {
  name: UserRoleEntity.name,
  schema: UserRoleSchema
}
