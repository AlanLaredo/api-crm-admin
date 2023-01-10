import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { OperationEntity } from 'src/entities/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class OperationService extends BaseServiceMongoose<OperationEntity> {
  constructor (
    @InjectModel(OperationEntity.name) private mainModel: Model<OperationEntity>) {
    super(mainModel)
  }
}
