import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProcessEntity } from 'src/entities/process'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ProcessService extends BaseServiceMongoose<ProcessEntity> {
  constructor (
    @InjectModel(ProcessEntity.name) private mainModel: Model<ProcessEntity>) {
    super(mainModel)
  }
}
