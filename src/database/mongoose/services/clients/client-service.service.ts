import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ClientService } from '../../models/client'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ClientServiceService extends BaseServiceMongoose<ClientService> {
  constructor (
    @InjectModel(ClientService.name) private mainModel: Model<ClientService>) {
    super(mainModel)
  }
}
