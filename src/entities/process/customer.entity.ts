import { Prop, Schema } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity } from '../common'

@Schema({
  collection: 'curstomers'
})
export class CustomerEntity extends IdentityLogEntity {
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

  @Prop({ type: PersonEntity })
    contact?: PersonEntity
}
