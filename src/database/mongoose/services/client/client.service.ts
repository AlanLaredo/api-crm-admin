import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseServiceMongoose } from '../common/base-service.mongoose'
import { ClientEntity } from 'src/entities/client'

@Injectable()
export class ClientService extends BaseServiceMongoose<ClientEntity> {
  constructor (
    @InjectModel(ClientEntity.name) private mainModel: Model<ClientEntity>) {
    super(mainModel)
  }

  clientWithClientServices () {
    // const ClientService = require('./models/clientService');
    return this.mainModel.aggregate([
      {
        $lookup: {
          from: 'client_services',
          let: { clientId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$clientId', '$$clientId']
                }
              }
            }
          ],
          as: 'clientServices'
        }
      }
    ])
  }
}
