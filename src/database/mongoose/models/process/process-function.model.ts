import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'process_functions'
})
export class ProcessFunction extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop({ required: true })
    key!: string
}

export const ProcessFunctionSchema = SchemaFactory.createForClass(ProcessFunction)

export const ProcessFunctionModel: ModelDefinition = {
  name: ProcessFunction.name,
  schema: ProcessFunctionSchema
}
