import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Process } from '../../models/process'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ProcessService extends BaseServiceMongoose<Process> {
  constructor (
    @InjectModel(Process.name) private mainModel: Model<Process>) {
    super(mainModel)
  }
}
