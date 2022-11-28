import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogModel } from '../common'

@Schema({
  collection: 'user_roles'
})
export class UserRoleModel extends IdentityLogModel {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    permissions?: Types.ObjectId[]
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleModel)
