import { ModelDefinition } from '@nestjs/mongoose'

import { ClientServiceEntity, ClientServiceSchema } from 'src/entities/client'

export const ClientServiceModel: ModelDefinition = {
  name: ClientServiceEntity.name,
  schema: ClientServiceSchema
}
