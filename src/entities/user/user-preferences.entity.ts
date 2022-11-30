import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

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

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferencesEntity)
