import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'positions'
})
export class Position extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Prop()
    salary?: number
}

export const PositionSchema = SchemaFactory.createForClass(Position)

export const PositionModel: ModelDefinition = {
  name: Position.name,
  schema: PositionSchema
}
