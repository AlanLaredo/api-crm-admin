/* eslint-disable no-useless-constructor */

import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppService } from './app.service'
import { UserService } from 'src/database/mongoose/services/users'
import { Types } from 'mongoose'
import { User } from 'src/database/mongoose/models/user'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly configService: ConfigService) {
  }

  @Get()
  async getHello () {
    const systemId: string = this.configService.get<string>('mongo.systemId')

    const newUser: User = {
      username: 'slaredo',
      password: '123',
      email: 'santiagoalan@gmail.com',
      firstName: 'Santiago',
      createdAt: new Date(),
      createdBy: new Types.ObjectId(systemId)
    }
    console.log('adsasd')

    const result = await this.userService.create(newUser)
    return result
  }
}
