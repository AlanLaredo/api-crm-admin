import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { JobVacancyStatusEntity } from 'src/entities/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class JobVacancyStatusService extends BaseServiceMongoose<JobVacancyStatusEntity> {
  constructor (
    @InjectModel(JobVacancyStatusEntity.name) private mainModel: Model<JobVacancyStatusEntity>) {
    super(mainModel)
  }
}
