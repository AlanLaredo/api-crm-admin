import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CompanyUserEntity } from 'src/entities/company'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CompanyUserService extends BaseServiceMongoose<CompanyUserEntity> {
  constructor (
    @InjectModel(CompanyUserEntity.name) private mainModel: Model<CompanyUserEntity>) {
    super(mainModel)
  }
}
