import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { EmployeeReassignment } from '../../models/employee'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class EmployeeReassignmentService extends BaseServiceMongoose<EmployeeReassignment> {
  constructor (
    @InjectModel(EmployeeReassignment.name) private mainModel: Model<EmployeeReassignment>) {
    super(mainModel)
  }
}
