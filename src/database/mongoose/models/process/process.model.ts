import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'processes'
})
export class Process extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    order!: number

  @Prop({ types: [mongoose.Schema.Types.ObjectId] })
    functionsIds?: Types.ObjectId[]

  @Prop()
    companyId!: Types.ObjectId
}

export const ProcessSchema = SchemaFactory.createForClass(Process)

export const ProcessModel: ModelDefinition = {
  name: Process.name,
  schema: ProcessSchema
}
