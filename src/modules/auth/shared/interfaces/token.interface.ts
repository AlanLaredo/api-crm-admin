import { Types } from 'mongoose'
import { RolePermissionEntity, UserRoleEntity } from 'src/entities/user'

// FIXME: this interface can be updated to include the new fields
export interface PayloadTokenInterface {
  roles?: UserRoleEntity[],
  permissions?: RolePermissionEntity[],
  userId?: Types.ObjectId
}
