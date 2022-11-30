import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PositionEntity } from 'src/entities/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class PositionService extends BaseServiceMongoose<PositionEntity> {
  constructor (
    @InjectModel(PositionEntity.name) private mainModel: Model<PositionEntity>) {
    super(mainModel)
  }
}
