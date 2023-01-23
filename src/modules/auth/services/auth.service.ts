import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RolePermissionService, UserRoleService, UserService } from 'src/database/mongoose/services/user'

import { RolePermissionEntity, UserEntity, UserRoleEntity } from 'src/entities/user'
import { IToken } from '../shared/interfaces'

@Injectable()
export class AuthService {
  /* eslint-disable no-useless-constructor */
  constructor (
    private jwtService: JwtService,
    private userService: UserService,
    private rolePermissionService: RolePermissionService,
    private userRoleService: UserRoleService) { }

  public async getHashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  public async passwordsMatch (password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
  }

  public async login (username: string, noHashedPassword: string): Promise<UserEntity> {
    username = username.toLowerCase()
    const user: any = await this.userService.getOne({ username })

    if (!user) {
      throw new UnauthorizedException('The user not exists')
    }
    const match = await this.passwordsMatch(noHashedPassword, user.password)
    if (!match) {
      return null
    }
    const { password, ...rta } = user.toJSON()
    return rta
  }

  public async generateToken (user: UserEntity) {
    const userRole: UserRoleEntity = await this.userRoleService.getById(user.roleAccessId)
    const permissions: RolePermissionEntity[] = await this.getPermissions(userRole)
    const { _id } = { ...user } as any
    const payload: IToken = {
      userId: _id,
      permissions,
      userRole
    }
    // const { permissionsConfig, ...userWithoutPermissions } = user
    return {
      access_token: this.jwtService.sign(payload),
      // user: userWithoutPermissions
      user: {
        ...user,
        userRole
      }
    }
  }

  private async getPermissions (role: UserRoleEntity) : Promise<RolePermissionEntity[]> {
    return this.rolePermissionService.getByIds(role.permissionsIds)
    // const _ = require('lodash')
    // const role: RoleAccessEntity = await this.roleService.getById(user.roleAccessId)
    // let permissionIds = []
    // if (role) {
    //   const denyPermissionIds = []
    //   user.permissionsConfig.forEach((permission: UserPermissionEntity) => {
    //     if (!permission.deny) {
    //       permissionIds.push(permission.permissionId)
    //     } else {
    //       denyPermissionIds.push(permission.permissionId)
    //     }
    //   })
    //   permissionIds = _.merge(permissionIds, role.permissionIds)
    //   permissionIds = _.filter(permissionIds, permission => denyPermissionIds.indexOf(permission) === -1)
    // }
    // const permissions = await this.permissionService.getByIds(permissionIds)
    // return permissions
    return []
  }
}
