import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { RolePermissionEntity } from 'src/entities/user'

@Schema({
  collection: 'role_permissions'
})
export class RolePermission extends RolePermissionEntity {
}

export const RolePermissionModel: ModelDefinition = {
  name: RolePermission.name,
  schema: SchemaFactory.createForClass(RolePermission)
}
