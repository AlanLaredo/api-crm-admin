import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogModel } from '../common'

@Schema({
  collection: 'user_preferences'
})
export class UserPreferencesModel extends IdentityLogModel {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Prop()
    theme?: string

  @Prop()
    menuMode?: string
}

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferencesModel)
