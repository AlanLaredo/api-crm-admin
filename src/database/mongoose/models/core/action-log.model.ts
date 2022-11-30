import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ActionLogEntity } from 'src/entities/core'

@Schema({
  collection: 'action_logs'
})
export class ActionLog extends ActionLogEntity {
}

export const ActionLogModel: ModelDefinition = {
  name: ActionLog.name,
  schema: SchemaFactory.createForClass(ActionLog)
}
