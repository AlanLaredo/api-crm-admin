import { ModelDefinition } from '@nestjs/mongoose'

import { ProductManagementEntity, ProductManagementSchema } from 'src/entities/inventory'

export const ProductManagementModel: ModelDefinition = {
  name: ProductManagementEntity.name,
  schema: ProductManagementSchema
}
