/* eslint-disable no-useless-constructor */

import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import mongoose, { Types } from 'mongoose'

import { AppService } from './app.service'
import { UserService } from 'src/database/mongoose/services/user'
import { User } from 'src/database/mongoose/models/user'
import { UserEntity } from 'src/entities/user'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly configService: ConfigService) {
  }

  @Get()
  async getHello () {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')

    // // get a custom configuration value
    // const dbHost = this.configService.get<string>('database.host');
    const newUser: User = {
      username: '1slaredo',
      password: '123',
      email: '1santiagoalan@gmail.com',
      firstName: 'Santiago',
      createdAt: new Date(),
      createdBy: new Types.ObjectId(systemId)
    }

    const newUser2: UserEntity = {
      username: '1Rodolfo',
      password: '1123',
      email: '1dep@gmail.com',
      firstName: 'Rodolfo',
      createdAt: new Date(),
      createdBy: new mongoose.Types.ObjectId(systemId)
    }

    console.log('adsasd' + newUser.firstName)
    console.log('adsasd' + newUser2.firstName)

    const result = await this.userService.create(newUser)
    const result2 = await this.userService.create(newUser2)
    return [result, result2]
  }
}
