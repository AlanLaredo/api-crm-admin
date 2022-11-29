import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserSession } from '../../models/user'
import { MainQueryMongoose } from '../main-query.mongoose'

@Injectable()
export class UserSessionService extends MainQueryMongoose<UserSession> {
  constructor (
    @InjectModel(UserSession.name) private mainModel: Model<UserSession>) {
    super(mainModel)
  }
}
