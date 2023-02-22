import { Controller, Get, Post, Req, UseGuards, UsePipes, Headers } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from '../services/auth.service'
import { UserEntity, UserRoleEntity } from 'src/entities/user'
import { Context } from '@nestjs/graphql'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { JwtAuthGuard } from '../shared/guards'
import { IToken } from '../shared/interfaces'
import decodeJWT from 'jwt-decode'
import { RolePermissionService, UserRoleService, UserService } from 'src/database/mongoose/services/user'

// import { UserEntity } from 'src/modules/users/entities/user.entity'

@Controller('auth')
export class AuthController {
  /* eslint-disable no-useless-constructor */
  constructor (private authService: AuthService, private userService: UserService, private userRoleService: UserRoleService, private rolePermissionService: RolePermissionService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login (@Req() req: Request) {
    const user = req.user as UserEntity
    return this.authService.generateToken(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('update')
  @UsePipes(UserDataPipe)
  async update (@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1]
    const permissions = await this.getPermissionForToken(token)
    return permissions
  }

  async getPermissionForToken (token: string) {
    const decodedToken: IToken = decodeJWT(token)
    const user: UserEntity = await this.userService.getById(decodedToken.userId)
    const userRole: UserRoleEntity = await this.userRoleService.getById(user.roleAccessId)
    const permissions = await this.rolePermissionService.getByIds(userRole?.permissionsIds)
    return permissions
  }
}
