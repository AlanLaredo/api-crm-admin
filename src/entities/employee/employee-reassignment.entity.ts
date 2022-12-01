import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'employee_reassignments'
})
export class EmployeeReassignmentEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    employeId!: Types.ObjectId

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    transmitterClientId!: Types.ObjectId

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    receiverClientId!: Types.ObjectId

  @Field()
  @Prop()
    reason?: string
}

export const EmployeeReassignmentSchema = SchemaFactory.createForClass(EmployeeReassignmentEntity)
