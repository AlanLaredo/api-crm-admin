import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogModel } from '../common'

@Schema({
  collection: 'role_permissions'
})
export class RolePermissionModel extends IdentityLogModel {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop()
    tag!: string
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermissionModel)
