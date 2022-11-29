import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CompanyGroup } from '../../models/company'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CompanyGroupService extends BaseServiceMongoose<CompanyGroup> {
  constructor (
    @InjectModel(CompanyGroup.name) private mainModel: Model<CompanyGroup>) {
    super(mainModel)
  }
}
