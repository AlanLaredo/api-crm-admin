import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ClientServiceEntity } from 'src/entities/client'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ClientServiceService extends BaseServiceMongoose<ClientServiceEntity> {
  constructor (
    @InjectModel(ClientServiceEntity.name) private mainModel: Model<ClientServiceEntity>) {
    super(mainModel)
  }
}
