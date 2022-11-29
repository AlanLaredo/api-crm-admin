import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema, PersonSchema } from '../common'

@Schema({
  collection: 'client_services'
})
export class ClientService extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    cientId!: Types.ObjectId

  @Prop()
    serviceType?: string

  @Prop()
    scheduleHours?: string

  @Prop()
    serviceCost?: number

  @Prop()
    elementCost?: number

  @Prop()
    patrolCost?: number

  @Prop()
    quadBikeCost?: number

  @Prop()
    bossShiftCost?: number

  @Prop()
    qrCost?: number

  @Prop()
    costHolyDays?: string

  @Prop()
    addressExecution?: string

  @Prop()
    totalElementsDay?: number

  @Prop()
    totalElementsNight?: number

  @Prop()
    totalPatrol?: number

  @Prop()
    totalQaudBike?: number

  @Prop()
    startDate?: Date

  @Prop({ type: PersonSchema })
    emergencyContact?: PersonSchema

  @Prop({ type: PersonSchema })
    paymentContact?: PersonSchema

  @Prop()
    creditDays?: string

  @Prop()
    paymentDays?: string

  @Prop()
    folioCounterReceipt?: string

  @Prop()
    billing?: string

  @Prop()
    branchBank?: string

  @Prop()
    lastFourDigits?: string

  @Prop()
    paymentMethod?: string

  @Prop()
    usageCfdi?: string

  @Prop()
    paymentForm?: string
}

export const ClientServiceSchema = SchemaFactory.createForClass(ClientService)

export const ClientServiceModel: ModelDefinition = {
  name: ClientService.name,
  schema: ClientServiceSchema
}
