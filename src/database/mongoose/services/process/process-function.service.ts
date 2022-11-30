import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProcessFunctionEntity } from 'src/entities/process'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ProcessFunctionService extends BaseServiceMongoose<ProcessFunctionEntity> {
  constructor (
    @InjectModel(ProcessFunctionEntity.name) private mainModel: Model<ProcessFunctionEntity>) {
    super(mainModel)
  }
}
