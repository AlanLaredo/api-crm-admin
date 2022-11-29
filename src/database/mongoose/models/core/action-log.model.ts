import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'action_logs'
})
export class ActionLog extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ types: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Prop({ type: String })
    file?: string

  @Prop({ type: String, required: true })
    action!: string

  @Prop({ type: String })
    description?: string
}

export const ActionLogSchema = SchemaFactory.createForClass(ActionLog)

export const ActionLogModel: ModelDefinition = {
  name: ActionLog.name,
  schema: ActionLogSchema
}
