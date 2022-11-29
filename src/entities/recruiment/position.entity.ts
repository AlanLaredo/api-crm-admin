import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'positions'
})
export class PositionEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Prop()
    salary?: number
}
