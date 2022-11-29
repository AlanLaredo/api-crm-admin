/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseServiceMongoose } from '../common/base-service.mongoose'

import { MetaConfiguration } from '../../models/core'

@Injectable()
export class MetaConfigurationService extends BaseServiceMongoose<MetaConfiguration> {
  constructor (
    @InjectModel(MetaConfiguration.name) public mainModel: Model<MetaConfiguration>
  ) {
    super(mainModel)
  }
}
