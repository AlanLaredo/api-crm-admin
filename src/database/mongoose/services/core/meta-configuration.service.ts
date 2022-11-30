/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MetaConfigurationEntity } from 'src/entities/core'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class MetaConfigurationService extends BaseServiceMongoose<MetaConfigurationEntity> {
  constructor (
    @InjectModel(MetaConfigurationEntity.name) public mainModel: Model<MetaConfigurationEntity>
  ) {
    super(mainModel)
  }
}
