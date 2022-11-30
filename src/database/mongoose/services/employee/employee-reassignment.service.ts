import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { EmployeeReassignmentEntity } from 'src/entities/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class EmployeeReassignmentService extends BaseServiceMongoose<EmployeeReassignmentEntity> {
  constructor (
    @InjectModel(EmployeeReassignmentEntity.name) private mainModel: Model<EmployeeReassignmentEntity>) {
    super(mainModel)
  }
}
