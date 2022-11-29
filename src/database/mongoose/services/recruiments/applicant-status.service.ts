import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ApplicantStatus } from '../../models/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ApplicantStatusService extends BaseServiceMongoose<ApplicantStatus> {
  constructor (
    @InjectModel(ApplicantStatus.name) private mainModel: Model<ApplicantStatus>) {
    super(mainModel)
  }
}
