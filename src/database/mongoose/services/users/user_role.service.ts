import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserRole } from '../../models/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserRoleService extends BaseServiceMongoose<UserRole> {
  constructor (
    @InjectModel(UserRole.name) private mainModel: Model<UserRole>) {
    super(mainModel)
  }
}
