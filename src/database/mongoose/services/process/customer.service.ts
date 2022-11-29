import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Customer } from '../../models/process'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class CustomerService extends BaseServiceMongoose<Customer> {
  constructor (
    @InjectModel(Customer.name) private mainModel: Model<Customer>) {
    super(mainModel)
  }
}
