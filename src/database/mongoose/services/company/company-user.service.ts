import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CompanyUser } from '../../models/company'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CompanyUserService extends BaseServiceMongoose<CompanyUser> {
  constructor (
    @InjectModel(CompanyUser.name) private mainModel: Model<CompanyUser>) {
    super(mainModel)
  }
}
