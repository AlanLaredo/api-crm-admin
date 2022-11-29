import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserSession } from '../../models/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserSessionService extends BaseServiceMongoose<UserSession> {
  constructor (
    @InjectModel(UserSession.name) private mainModel: Model<UserSession>) {
    super(mainModel)
  }
}
