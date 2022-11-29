import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseServiceMongoose } from '../common/base-service.mongoose'
import { Position } from '../../models/recruiment'

@Injectable()
export class PositionService extends BaseServiceMongoose<Position> {
  constructor (
    @InjectModel(Position.name) private mainModel: Model<Position>) {
    super(mainModel)
  }
}
