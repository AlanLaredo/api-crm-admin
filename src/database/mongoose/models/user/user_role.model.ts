import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { UserRoleEntity } from 'src/entities/user'

@Schema({
  collection: 'user_roles'
})
export class UserRole extends UserRoleEntity {
}

export const UserRoleModel: ModelDefinition = {
  name: UserRole.name,
  schema: SchemaFactory.createForClass(UserRole)
}
