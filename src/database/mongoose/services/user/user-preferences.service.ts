import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserPreferencesEntity } from 'src/entities/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserPreferencesService extends BaseServiceMongoose<UserPreferencesEntity> {
  constructor (
    @InjectModel(UserPreferencesEntity.name) private mainModel: Model<UserPreferencesEntity>) {
    super(mainModel)
  }
}
