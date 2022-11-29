import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'users'
})
export class User extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true, unique: true })
    username!: string

  @Prop({ required: true })
    password?: string

  @Prop({ required: true, unique: true })
    email!: string

  @Prop({ required: true })
    firstName!: string

  @Prop()
    lastName?: string

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    roleAccessId?: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: SchemaFactory.createForClass(User)
}
