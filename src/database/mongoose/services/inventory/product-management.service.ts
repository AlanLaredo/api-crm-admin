import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProductManagementEntity } from 'src/entities/inventory'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ProductManagementService extends BaseServiceMongoose<ProductManagementEntity> {
  constructor (
    @InjectModel(ProductManagementEntity.name) private mainModel: Model<ProductManagementEntity>) {
    super(mainModel)
  }
}
