import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'user_preferences'
})
export class UserPreferences extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Prop()
    theme?: string

  @Prop()
    menuMode?: string
}

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences)

export const UserPreferencesModel: ModelDefinition = {
  name: UserPreferences.name,
  schema: UserPreferencesSchema
}
