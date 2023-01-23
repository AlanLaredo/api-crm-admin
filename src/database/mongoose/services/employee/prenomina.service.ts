import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PrenominaEntity } from 'src/entities/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class PrenominaService extends BaseServiceMongoose<PrenominaEntity> {
  constructor (
    @InjectModel(PrenominaEntity.name) private mainModel: Model<PrenominaEntity>) {
    super(mainModel)
  }
}
