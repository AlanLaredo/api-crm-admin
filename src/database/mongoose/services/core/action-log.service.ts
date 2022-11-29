/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseServiceMongoose } from '../common/base-service.mongoose'

import { ActionLog } from '../../models/core'

@Injectable()
export class ActionLogService extends BaseServiceMongoose<ActionLog> {
  constructor (
    @InjectModel(ActionLog.name) public mainModel: Model<ActionLog>
  ) {
    super(mainModel)
  }
}
