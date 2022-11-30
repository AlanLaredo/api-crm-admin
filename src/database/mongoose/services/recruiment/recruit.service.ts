import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RecruitEntity } from 'src/entities/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class RecruitService extends BaseServiceMongoose<RecruitEntity> {
  constructor (
    @InjectModel(RecruitEntity.name) private mainModel: Model<RecruitEntity>) {
    super(mainModel)
  }
}
