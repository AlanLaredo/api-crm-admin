import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { EmployeeEntity } from 'src/entities/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class EmployeeService extends BaseServiceMongoose<EmployeeEntity> {
  constructor (
    @InjectModel(EmployeeEntity.name) private mainModel: Model<EmployeeEntity>) {
    super(mainModel)
  }
}
