import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from '../services/auth.service'
import { UserEntity } from 'src/entities/user'
// import { UserEntity } from 'src/modules/users/entities/user.entity'

@Controller('auth')
export class AuthController {
  /* eslint-disable no-useless-constructor */
  constructor (private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login (@Req() req: Request) {
    const user = req.user as UserEntity
    return this.authService.generateToken(user)
  }
}
