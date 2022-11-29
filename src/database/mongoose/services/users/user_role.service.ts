import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserRole } from '../../models/user'
import { MainQueryMongoose } from '../main-query.mongoose'

@Injectable()
export class UserRoleService extends MainQueryMongoose<UserRole> {
  constructor (
    @InjectModel(UserRole.name) private mainModel: Model<UserRole>) {
    super(mainModel)
  }
}
