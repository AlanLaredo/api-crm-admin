import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CustomerEntity } from 'src/entities/process'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CustomerService extends BaseServiceMongoose<CustomerEntity> {
  constructor (
    @InjectModel(CustomerEntity.name) private mainModel: Model<CustomerEntity>) {
    super(mainModel)
  }
}
