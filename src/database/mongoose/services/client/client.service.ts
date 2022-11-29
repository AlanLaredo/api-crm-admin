import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Client } from '../../models/client'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ClientService extends BaseServiceMongoose<Client> {
  constructor (
    @InjectModel(Client.name) private mainModel: Model<Client>) {
    super(mainModel)
  }
}
