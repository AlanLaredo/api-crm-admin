import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'user_preferences'
})
export class UserPreferencesEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Prop()
    theme?: string

  @Prop()
    menuMode?: string
}
