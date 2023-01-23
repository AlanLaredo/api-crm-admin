import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { NominaEntity } from 'src/entities/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class NominaService extends BaseServiceMongoose<NominaEntity> {
  constructor (
    @InjectModel(NominaEntity.name) private mainModel: Model<NominaEntity>) {
    super(mainModel)
  }
}
