import { IModel } from '../../interfaces'
import { RolePermissionModel, RolePermissionSchema } from './role-permission.model'
import { UserPreferencesModel, UserPreferencesSchema } from './user-preferences.model'
import { UserSessionModel, UserSessionSchema } from './user-session.model'
import { UserModel, UserSchema } from './user.model'
import { UserRoleModel, UserRoleSchema } from './user_role.model'

export const USER_MODELS: IModel[] = [{
  name: UserModel.name,
  schema: UserSchema
}, {
  name: UserSessionModel.name,
  schema: UserSessionSchema
}, {
  name: UserPreferencesModel.name,
  schema: UserPreferencesSchema
}, {
  name: UserRoleModel.name,
  schema: UserRoleSchema
}, {
  name: RolePermissionModel.name,
  schema: RolePermissionSchema
}]

export {
  UserModel,
  UserSessionModel,
  UserPreferencesModel,
  UserRoleModel,
  RolePermissionModel
}
