import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PrenominaConfigurationEntity } from 'src/entities/prenomina'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class PrenominaConfigurationService extends BaseServiceMongoose<PrenominaConfigurationEntity> {
  constructor (
    @InjectModel(PrenominaConfigurationEntity.name) private mainModel: Model<PrenominaConfigurationEntity>) {
    super(mainModel)
  }
}
