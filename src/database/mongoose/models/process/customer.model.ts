import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogSchema, PersonSchema } from '../common'

@Schema({
  collection: 'curstomers'
})
export class Customer extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    processId!: Types.ObjectId

  @Prop({ required: true })
    commercialValue!: number

  @Prop({ required: true })
    attemptClosingDate!: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Prop({ required: true })
    customerName!: string

  @Prop()
    catalogPriority?: number

  @Prop()
    attachedQuotePath?: string

  @Prop()
    comments?: string

  @Prop({ type: PersonSchema })
    contact?: PersonSchema
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)

export const CustomerModel: ModelDefinition = {
  name: Customer.name,
  schema: CustomerSchema
}
