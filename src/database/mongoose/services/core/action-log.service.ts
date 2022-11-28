/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MainQueryMongoose } from '../main-query.mongoose'

import { ActionLogModel } from '../../models/core'

@Injectable()
export class ActionLogService extends MainQueryMongoose<ActionLogModel> {
  constructor (
    @InjectModel(ActionLogModel.name) public MainModel: Model<ActionLogModel>
  ) {
    super(MainModel)
  }
}
