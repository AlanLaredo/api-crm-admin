import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { JobVacancy } from '../../models/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class JobVacancyService extends BaseServiceMongoose<JobVacancy> {
  constructor (
    @InjectModel(JobVacancy.name) private mainModel: Model<JobVacancy>) {
    super(mainModel)
  }
}
