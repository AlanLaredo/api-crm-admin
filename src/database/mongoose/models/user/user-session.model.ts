import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogModel } from '../common'

@Schema({
  collection: 'user_sessions'
})
export class UserSessionModel extends IdentityLogModel {
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

export const UserSessionSchema = SchemaFactory.createForClass(UserSessionModel)
