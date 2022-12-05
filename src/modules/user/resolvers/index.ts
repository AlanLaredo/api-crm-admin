import { RolePermissionResolver } from './role-permission.resolver'
import { UserPreferencesResolver } from './user-preferences.resolver'
import { UserRoleResolver } from './user-role.resolver'
import { UserSessionResolver } from './user-session.resolver'
import { UserResolver } from './user.resolver'

export const USER_RESOLVERS = [
  RolePermissionResolver,
  UserPreferencesResolver,
  UserRoleResolver,
  UserSessionResolver,
  UserResolver
]

export {
  RolePermissionResolver,
  UserPreferencesResolver,
  UserRoleResolver,
  UserSessionResolver,
  UserResolver
}
