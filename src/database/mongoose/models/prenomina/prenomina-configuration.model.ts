import { ModelDefinition } from '@nestjs/mongoose'

import { PrenominaConfigurationEntity, PrenominaConfigurationSchema } from 'src/entities/prenomina'

export const PrenominaConfigurationModel: ModelDefinition = {
  name: PrenominaConfigurationEntity.name,
  schema: PrenominaConfigurationSchema
}
