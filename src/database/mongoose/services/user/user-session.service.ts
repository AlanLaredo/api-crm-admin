import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserSessionEntity } from 'src/entities/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserSessionService extends BaseServiceMongoose<UserSessionEntity> {
  constructor (
    @InjectModel(UserSessionEntity.name) private mainModel: Model<UserSessionEntity>) {
    super(mainModel)
  }
}
