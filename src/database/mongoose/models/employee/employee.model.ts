import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { AddressSchema, IdentityLogSchema, PersonSchema } from '../common'

@Schema({
  collection: 'employees'
})
export class Employee extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop()
    keycode?: string

  @Prop({ type: PersonSchema, required: true })
    person!: PersonSchema

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    positionId?: Types.ObjectId

  @Prop()
    hiringDate?: Date

  @Prop()
    startOperationDate?: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId?: Types.ObjectId

  @Prop({ type: AddressSchema })
    address?: AddressSchema
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)

export const EmployeeModel: ModelDefinition = {
  name: Employee.name,
  schema: EmployeeSchema
}
