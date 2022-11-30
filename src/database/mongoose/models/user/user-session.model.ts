import { ModelDefinition } from '@nestjs/mongoose'

import { UserSessionEntity, UserSessionSchema } from 'src/entities/user'

export const UserSessionModel: ModelDefinition = {
  name: UserSessionEntity.name,
  schema: UserSessionSchema
}
