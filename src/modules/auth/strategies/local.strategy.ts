import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from '../services'
import { UserEntity } from 'src/entities/user'

// login strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor (private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    })
  }

  public async validate (username: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.authService.login(username, password)
    if (!user) {
      throw new UnauthorizedException('The user or credentials not valid')
    }
    return user
  }
}
