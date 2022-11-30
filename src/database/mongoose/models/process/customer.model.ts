import { ModelDefinition } from '@nestjs/mongoose'

import { CustomerEntity, CustomerSchema } from 'src/entities/process'

export const CustomerModel: ModelDefinition = {
  name: CustomerEntity.name,
  schema: CustomerSchema
}
