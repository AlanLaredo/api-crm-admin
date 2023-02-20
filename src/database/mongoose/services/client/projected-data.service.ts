import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProjectedDataEntity } from 'src/entities/client'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ProjectedDataService extends BaseServiceMongoose<ProjectedDataEntity> {
  constructor (
    @InjectModel(ProjectedDataEntity.name) private mainModel: Model<ProjectedDataEntity>) {
    super(mainModel)
  }
}
