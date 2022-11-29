import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserPreferences } from '../../models/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserPreferencesService extends BaseServiceMongoose<UserPreferences> {
  constructor (
    @InjectModel(UserPreferences.name) private mainModel: Model<UserPreferences>) {
    super(mainModel)
  }
}
