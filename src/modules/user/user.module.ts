import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Types } from 'mongoose'
import { RolePermissionService, UserRoleService, UserService } from 'src/database/mongoose/services/user'
import { RolePermissionEntity, UserEntity, UserRoleEntity } from 'src/entities/user'
import { AuthService } from '../auth/services'

import { CommonModule } from '../common/common.module'
import { USER_RESOLVERS } from './resolvers'
import { ROLE_PERMISSIONS } from './shared/data'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...USER_RESOLVERS
  ],
  exports: []
})
export class UserModule {
  constructor (private userService: UserService,
    private userRoleService: UserRoleService,
    private authService: AuthService,
    private rolePermissionService: RolePermissionService,
    private configService: ConfigService) {
    console.log('User module sucessfully initialized.')
    this.initialConfiguration()
  }

  async initialConfiguration () {
    await this.checkPermissions()
    let userRoleAdmin: UserRoleEntity = await this.userRoleService.getOne({
      name: 'CrmAdmin'
    })

    userRoleAdmin = await this.createOrUpdateUserRole(userRoleAdmin)

    const adminUser = await this.userService.getOne({
      roleAccessId: userRoleAdmin.id
    })

    if (!adminUser) {
      this.createAdminUser(userRoleAdmin.id)
      // add some default permissions to the user role admin
    }
  }

  async checkPermissions () {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')

    const permissions: RolePermissionEntity[] = await Promise.all(ROLE_PERMISSIONS.map((permission: Partial<RolePermissionEntity>) => this.rolePermissionService.getOne({ tag: permission.tag })))

    const newRolePermissionPromises: Promise<RolePermissionEntity>[] = []
    ROLE_PERMISSIONS.forEach((permission: Partial<RolePermissionEntity>) => {
      const foundPermission: RolePermissionEntity = permissions.find(p => p && p.tag && p.tag === permission.tag)
      if (!foundPermission) {
        newRolePermissionPromises.push(this.rolePermissionService.create({ ...permission, createdBy: systemId, createdAt: new Date() }))
      } else {
        newRolePermissionPromises.push(this.rolePermissionService.update(foundPermission.id, { ...permission }))
      }
    })

    return Promise.all(newRolePermissionPromises)
  }

  async createOrUpdateUserRole (userRole: UserRoleEntity) {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')
    let permissionsToCrmAdmin: RolePermissionEntity[] = []

    const tags: string[] = ['company',
      'company.set',
      'company.delete',
      'companyGroups',
      'companyGroups.set',
      'companyGroups.delete',
      'users',
      'users.set',
      'users.delete',
      'roles',
      'roles.set',
      'roles.delete',
      'home'
    ]

    permissionsToCrmAdmin = await this.rolePermissionService.getWhereIn({}, 'tag', tags)
    const id = userRole && userRole.id ? userRole.id : null
    userRole = {
      name: 'CrmAdmin',
      description: 'Este rol es solo para usuarios administradores de CRM. No se puede editar.',
      permissionsIds: permissionsToCrmAdmin.map(permission => new Types.ObjectId(permission.id)),
      createdAt: new Date(),
      createdBy: new Types.ObjectId(systemId)
    }
    return id ? this.userRoleService.update(id, userRole) : this.userRoleService.create(userRole)
  }

  async createAdminUser (roleAccessId: Types.ObjectId) {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')
    const defaultPassword: string = this.configService.get<string>('config.mongo.defaultPassword')
    const hashedPassword: string = await this.authService.getHashPassword(defaultPassword)
    // new Types.ObjectId(systemId)
    const data: UserEntity = {
      username: 'admin',
      firstName: 'CrmAdmin',
      password: hashedPassword, // changue this, pls
      email: 'admin@crm.com',
      roleAccessId,
      createdBy: new Types.ObjectId(systemId),
      createdAt: new Date()
    }
    return await this.userService.create(data)
  }
}
