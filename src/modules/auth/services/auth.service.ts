import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

import { RolePermissionEntity, UserEntity } from 'src/entities/user'
import { PayloadTokenInterface } from '../shared/interfaces/token.interface'

@Injectable()
export class AuthService {
  /* eslint-disable no-useless-constructor */
  constructor (
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    private jwtService: JwtService) { }

  public async getHashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  public async passwordsMatch (password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
  }

  public async login (username: string, noHashedPassword: string): Promise<UserEntity> {
    username = username.toLowerCase()
    const user = await this.userModel.findOne({ username })
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
    const permissions: RolePermissionEntity[] = await this.getPermissions(user)
    const { _id } = { ...user } as any
    const payload: PayloadTokenInterface = {
      userId: _id,
      permissions
    }

    // const { permissionsConfig, ...userWithoutPermissions } = user

    return {
      access_token: this.jwtService.sign(payload),
      // user: userWithoutPermissions
      user
    }
  }

  private async getPermissions (user: UserEntity) : Promise<RolePermissionEntity[]> {
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
