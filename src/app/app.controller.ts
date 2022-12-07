/* eslint-disable no-useless-constructor */

import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppService } from './app.service'
import { UserService } from 'src/database/mongoose/services/user'
import { AuthService } from 'src/modules/auth/services'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService) {
  }

  @Get()
  async getHello () {
    // const systemId: string = this.configService.get<string>('config.mongo.systemId')

    // // get a custom configuration value
    // const newUser: UserEntity = {
    //   username: 'slaredo',
    //   password: 'Pass.word*',
    //   email: 'santiagoalan@gmail.com',
    //   firstName: 'Santiago',
    //   lastName: 'Laredo',
    //   createdAt: new Date(),
    //   createdBy: new Types.ObjectId(systemId)
    // }

    // newUser.password = await this.authService.getHashPassword(newUser.password)

    // const result = await this.userService.create(newUser)
    // const result2 = await this.userService.create(newUser2)
    return {}
  }
}
