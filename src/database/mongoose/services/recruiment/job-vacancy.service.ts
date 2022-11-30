import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { JobVacancyEntity } from 'src/entities/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class JobVacancyService extends BaseServiceMongoose<JobVacancyEntity> {
  constructor (
    @InjectModel(JobVacancyEntity.name) private mainModel: Model<JobVacancyEntity>) {
    super(mainModel)
  }
}
