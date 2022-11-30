import { ModelDefinition } from '@nestjs/mongoose'

import { UserPreferencesEntity, UserPreferencesSchema } from 'src/entities/user'

export const UserPreferencesModel: ModelDefinition = {
  name: UserPreferencesEntity.name,
  schema: UserPreferencesSchema
}
