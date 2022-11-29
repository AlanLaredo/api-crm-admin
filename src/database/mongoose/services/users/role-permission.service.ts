import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RolePermission } from '../../models/user'
import { MainQueryMongoose } from '../main-query.mongoose'

@Injectable()
export class RolePermissionService extends MainQueryMongoose<RolePermission> {
  constructor (
    @InjectModel(RolePermission.name) private mainModel: Model<RolePermission>) {
    super(mainModel)
  }
}
