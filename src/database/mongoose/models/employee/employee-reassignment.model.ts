import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'employee_reassignments'
})
export class EmployeeReassignment extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    employeId!: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    transmitterClientId!: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    receiverClientId!: Types.ObjectId

  @Prop()
    reason?: string
}

export const EmployeeReassignmentSchema = SchemaFactory.createForClass(EmployeeReassignment)

export const EmployeeReassignmentModel: ModelDefinition = {
  name: EmployeeReassignment.name,
  schema: EmployeeReassignmentSchema
}
