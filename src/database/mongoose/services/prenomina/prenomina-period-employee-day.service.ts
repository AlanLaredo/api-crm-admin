import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PrenominaPeriodEmployeeDayEntity } from 'src/entities/prenomina'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class PrenominaPeriodEmployeeDayService extends BaseServiceMongoose<PrenominaPeriodEmployeeDayEntity> {
  constructor (
    @InjectModel(PrenominaPeriodEmployeeDayEntity.name) private mainModel: Model<PrenominaPeriodEmployeeDayEntity>) {
    super(mainModel)
  }
}
