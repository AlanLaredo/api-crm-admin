/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MainQueryMongoose } from '../main-query.mongoose'

import { MetaConfigurationModel } from '../../models/core'

@Injectable()
export class MetaConfigurationService extends MainQueryMongoose<MetaConfigurationModel> {
  constructor (
    @InjectModel(MetaConfigurationModel.name) public MainModel: Model<MetaConfigurationModel>
  ) {
    super(MainModel)
  }
}
