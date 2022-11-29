import { RolePermissionService } from './role-permission.service'
import { UserPreferencesService } from './user-preferences.service'
import { UserSessionService } from './user-session.service'
import { UserService } from './user.service'
import { UserRoleService } from './user_role.service'

export const USER_SERVICES = [
  RolePermissionService,
  UserRoleService,
  UserPreferencesService,
  UserSessionService,
  UserService
]

export {
  RolePermissionService,
  UserRoleService,
  UserPreferencesService,
  UserSessionService,
  UserService
}
