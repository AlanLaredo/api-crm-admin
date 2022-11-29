import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RolePermission } from '../../models/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class RolePermissionService extends BaseServiceMongoose<RolePermission> {
  constructor (
    @InjectModel(RolePermission.name) private mainModel: Model<RolePermission>) {
    super(mainModel)
  }
}
