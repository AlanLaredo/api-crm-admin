import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PrenominaPeriodEntity } from 'src/entities/prenomina'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class PrenominaPeriodService extends BaseServiceMongoose<PrenominaPeriodEntity> {
  constructor (
    @InjectModel(PrenominaPeriodEntity.name) private mainModel: Model<PrenominaPeriodEntity>) {
    super(mainModel)
  }
}
