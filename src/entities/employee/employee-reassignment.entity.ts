import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

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
