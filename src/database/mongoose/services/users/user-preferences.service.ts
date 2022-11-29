import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserPreferences } from '../../models/user'
import { MainQueryMongoose } from '../main-query.mongoose'

@Injectable()
export class UserPreferencesService extends MainQueryMongoose<UserPreferences> {
  constructor (
    @InjectModel(UserPreferences.name) private mainModel: Model<UserPreferences>) {
    super(mainModel)
  }
}
