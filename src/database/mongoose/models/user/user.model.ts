import { ModelDefinition } from '@nestjs/mongoose'

import { UserEntity, UserSchema } from 'src/entities/user'

export const UserModel: ModelDefinition = {
  name: UserEntity.name,
  schema: UserSchema
}
