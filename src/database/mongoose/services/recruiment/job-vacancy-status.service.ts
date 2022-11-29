import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { JobVacancyStatus } from '../../models/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class JobVacancyStatusService extends BaseServiceMongoose<JobVacancyStatus> {
  constructor (
    @InjectModel(JobVacancyStatus.name) private mainModel: Model<JobVacancyStatus>) {
    super(mainModel)
  }
}
