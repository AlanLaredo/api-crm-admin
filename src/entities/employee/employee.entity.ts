import { Prop } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { AddressEntity, IdentityLogEntity, PersonEntity } from '../common'

// @Schema({
//   collection: 'employees'
// })
export class EmployeeEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop()
    keycode?: string

  @Prop({ type: PersonEntity, required: true })
    person!: PersonEntity

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    positionId?: Types.ObjectId

  @Prop()
    hiringDate?: Date

  @Prop()
    startOperationDate?: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId?: Types.ObjectId

  @Prop({ type: AddressEntity })
    address?: AddressEntity
}
