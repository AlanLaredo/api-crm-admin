/* eslint-disable no-useless-constructor */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import decodeJWT from 'jwt-decode'

import { UserService } from 'src/database/mongoose/services/user'
import { UserEntity } from 'src/entities/user'
import { IToken } from 'src/modules/auth/shared/interfaces'

@Injectable()
export class UserDataPipe implements PipeTransform {
  constructor (private readonly userService: UserService) {
  }

  async transform (
    value: any,
    metadata: ArgumentMetadata) : Promise<UserEntity> {
    const decodedToken: IToken = decodeJWT(value.req.headers.authorization)
    const user = await this.userService.getById(decodedToken.userId)
    return user
  }
}
