import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Recruit } from '../../models/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class RecruitService extends BaseServiceMongoose<Recruit> {
  constructor (
    @InjectModel(Recruit.name) private mainModel: Model<Recruit>) {
    super(mainModel)
  }
}
