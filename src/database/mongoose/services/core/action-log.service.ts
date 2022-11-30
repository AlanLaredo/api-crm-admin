/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ActionLogEntity } from 'src/entities/core'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ActionLogService extends BaseServiceMongoose<ActionLogEntity> {
  constructor (
    @InjectModel(ActionLogEntity.name) public mainModel: Model<ActionLogEntity>
  ) {
    super(mainModel)
  }
}
