import { Prop } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

// @Schema({
//   collection: 'action_logs'
// })
export class ActionLogEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ types: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Prop({ type: String })
    file?: string

  @Prop({ type: String, required: true })
    action!: string

  @Prop({ type: String })
    description?: string
}
