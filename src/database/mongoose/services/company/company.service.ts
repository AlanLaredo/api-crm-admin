import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Company } from '../../models/company'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CompanyService extends BaseServiceMongoose<Company> {
  constructor (
    @InjectModel(Company.name) private mainModel: Model<Company>) {
    super(mainModel)
  }
}
