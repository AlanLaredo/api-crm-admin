import { ModelDefinition } from '@nestjs/mongoose'

import { ActionLogEntity, ActionLogSchema } from 'src/entities/core'

export const ActionLogModel: ModelDefinition = {
  name: ActionLogEntity.name,
  schema: ActionLogSchema
}
