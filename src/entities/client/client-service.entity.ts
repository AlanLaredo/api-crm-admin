import { Prop } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity } from '../common'

// @Schema({
//   collection: 'client_services'
// })
export class ClientServiceEntity extends IdentityLogEntity {
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

  @Prop({ type: PersonEntity })
    emergencyContact?: PersonEntity

  @Prop({ type: PersonEntity })
    paymentContact?: PersonEntity

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
