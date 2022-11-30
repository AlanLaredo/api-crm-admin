import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { UserPreferencesEntity } from 'src/entities/user'

@Schema({
  collection: 'user_preferences'
})
export class UserPreferences extends UserPreferencesEntity {
}

export const UserPreferencesModel: ModelDefinition = {
  name: UserPreferences.name,
  schema: SchemaFactory.createForClass(UserPreferences)
}
