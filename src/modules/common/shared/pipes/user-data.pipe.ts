/* eslint-disable no-useless-constructor */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import decodeJWT from 'jwt-decode'

import { UserRoleService, UserService } from 'src/database/mongoose/services/user'
import { UserEntity, UserRoleEntity } from 'src/entities/user'
import { IToken } from 'src/modules/auth/shared/interfaces'

@Injectable()
export class UserDataPipe implements PipeTransform<UserEntity> {
  constructor (private readonly userService: UserService,
    private readonly userRoleService: UserRoleService) {
  }

  async transform (
    value: any,
    metadata: ArgumentMetadata) : Promise<UserEntity> {
    const decodedToken: IToken = decodeJWT(value.req.headers.authorization)
    const user: UserEntity = await this.userService.getById(decodedToken.userId)
    const userRole: UserRoleEntity = await this.userRoleService.getById(user.roleAccessId)
    if (userRole && userRole.name === 'CrmAdmin') {
      user.roleAccess = userRole
      user.isAdmin = true
    } else {
      user.isAdmin = false
    }
    return user
  }
}
