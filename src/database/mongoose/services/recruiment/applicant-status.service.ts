import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ApplicantStatusEntity } from 'src/entities/recruiment'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ApplicantStatusService extends BaseServiceMongoose<ApplicantStatusEntity> {
  constructor (
    @InjectModel(ApplicantStatusEntity.name) private mainModel: Model<ApplicantStatusEntity>) {
    super(mainModel)
  }
}
