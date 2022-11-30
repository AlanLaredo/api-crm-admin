import { ModelDefinition } from '@nestjs/mongoose'

import { MetaConfigurationEntity, MetaConfigurationSchema } from 'src/entities/core'

export const MetaConfigurationModel: ModelDefinition = {
  name: MetaConfigurationEntity.name,
  schema: MetaConfigurationSchema
}
