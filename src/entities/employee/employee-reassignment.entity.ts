import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'employee_reassignments'
})
export class EmployeeReassignmentEntity extends IdentityLogEntity {
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

export const EmployeeReassignmentSchema = SchemaFactory.createForClass(EmployeeReassignmentEntity)
