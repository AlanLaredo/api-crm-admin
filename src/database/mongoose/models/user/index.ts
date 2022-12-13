import { IModel } from '../../interfaces'
import { RolePermissionModel } from './role-permission.model'
import { UserPreferencesModel } from './user-preferences.model'
import { UserSessionModel } from './user-session.model'
import { UserModel } from './user.model'
import { UserRoleModel } from './user-role.model'

export const USER_MODELS: IModel[] = [
  RolePermissionModel,
  UserPreferencesModel,
  UserSessionModel,
  UserModel,
  UserRoleModel
]
