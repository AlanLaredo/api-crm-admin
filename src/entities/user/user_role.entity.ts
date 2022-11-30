import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'user_roles'
})
export class UserRoleEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    permissionsIds?: Types.ObjectId[]
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleEntity)
