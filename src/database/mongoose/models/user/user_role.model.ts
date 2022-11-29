import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'user_roles'
})
export class UserRole extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    permissions?: Types.ObjectId[]
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole)

export const UserRoleModel: ModelDefinition = {
  name: UserRole.name,
  schema: UserRoleSchema
}
