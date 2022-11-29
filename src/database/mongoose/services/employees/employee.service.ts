import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Employee } from '../../models/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class EmployeeService extends BaseServiceMongoose<Employee> {
  constructor (
    @InjectModel(Employee.name) private mainModel: Model<Employee>) {
    super(mainModel)
  }
}
