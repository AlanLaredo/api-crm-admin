import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'role_permissions'
})
export class RolePermission extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop()
    tag!: string
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission)

export const RolePermissionModel: ModelDefinition = {
  name: RolePermission.name,
  schema: RolePermissionSchema
}
