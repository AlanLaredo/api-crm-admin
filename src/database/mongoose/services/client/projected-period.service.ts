import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProjectedPeriodEntity } from 'src/entities/client'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ProjectedPeriodService extends BaseServiceMongoose<ProjectedPeriodEntity> {
  constructor (
    @InjectModel(ProjectedPeriodEntity.name) private mainModel: Model<ProjectedPeriodEntity>) {
    super(mainModel)
  }
}
