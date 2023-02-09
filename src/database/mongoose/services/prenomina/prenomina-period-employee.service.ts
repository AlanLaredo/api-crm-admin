import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PrenominaPeriodEmployeeEntity } from 'src/entities/prenomina'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class PrenominaPeriodEmployeeService extends BaseServiceMongoose<PrenominaPeriodEmployeeEntity> {
  constructor (
    @InjectModel(PrenominaPeriodEmployeeEntity.name) private mainModel: Model<PrenominaPeriodEmployeeEntity>) {
    super(mainModel)
  }
}
