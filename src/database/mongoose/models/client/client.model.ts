import { ModelDefinition } from '@nestjs/mongoose'

import { ClientEntity, ClientSchema } from 'src/entities/client'

export const ClientModel: ModelDefinition = {
  name: ClientEntity.name,
  schema: ClientSchema
}
