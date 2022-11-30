import { Prop } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

// @Schema({
//   collection: 'processes'
// })
export class ProcessEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    order!: number

  @Prop({ types: [mongoose.Schema.Types.ObjectId] })
    functionsIds?: Types.ObjectId[]

  @Prop()
    companyId!: Types.ObjectId
}
