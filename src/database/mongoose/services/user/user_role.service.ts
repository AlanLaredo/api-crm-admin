import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserRoleEntity } from 'src/entities/user'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserRoleService extends BaseServiceMongoose<UserRoleEntity> {
  constructor (
    @InjectModel(UserRoleEntity.name) private mainModel: Model<UserRoleEntity>) {
    super(mainModel)
  }
}
