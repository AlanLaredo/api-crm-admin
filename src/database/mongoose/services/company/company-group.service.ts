import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CompanyGroupEntity } from 'src/entities/company'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CompanyGroupService extends BaseServiceMongoose<CompanyGroupEntity> {
  constructor (
    @InjectModel(CompanyGroupEntity.name) private mainModel: Model<CompanyGroupEntity>) {
    super(mainModel)
  }
}
