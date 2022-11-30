import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RolePermissionEntity } from 'src/entities/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class RolePermissionService extends BaseServiceMongoose<RolePermissionEntity> {
  constructor (
    @InjectModel(RolePermissionEntity.name) private mainModel: Model<RolePermissionEntity>) {
    super(mainModel)
  }
}
