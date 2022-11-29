import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'user_sessions'
})
export class UserSessionEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Prop({ default: false })
    changePassword?: boolean

  @Prop({ required: true, default: 'web-crm-admin' })
    platformKey!: string

  @Prop({ required: true })
    token!: string
}
