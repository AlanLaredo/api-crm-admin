import { IModel } from '../../interfaces'
import { RolePermissionModel, RolePermission } from './role-permission.model'
import { UserPreferencesModel, UserPreferences } from './user-preferences.model'
import { UserSessionModel, UserSession } from './user-session.model'
import { UserModel, User } from './user.model'
import { UserRoleModel, UserRole } from './user_role.model'

export const USER_MODELS: IModel[] = [
  RolePermissionModel,
  UserPreferencesModel,
  UserSessionModel,
  UserModel,
  UserRoleModel
]

export {
  User,
  RolePermission,
  UserPreferences,
  UserSession,
  UserRole
}
