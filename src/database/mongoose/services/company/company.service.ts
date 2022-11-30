import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CompanyEntity } from 'src/entities/company'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CompanyService extends BaseServiceMongoose<CompanyEntity> {
  constructor (
    @InjectModel(CompanyEntity.name) private mainModel: Model<CompanyEntity>) {
    super(mainModel)
  }
}
