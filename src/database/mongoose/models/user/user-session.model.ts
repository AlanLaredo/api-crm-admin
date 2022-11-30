import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { UserSessionEntity } from 'src/entities/user'

@Schema({
  collection: 'user_sessions'
})
export class UserSession extends UserSessionEntity {
}

export const UserSessionModel: ModelDefinition = {
  name: UserSession.name,
  schema: SchemaFactory.createForClass(UserSession)
}
