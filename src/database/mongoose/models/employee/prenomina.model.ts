import { ModelDefinition } from '@nestjs/mongoose'

import { PrenominaEntity, PrenominaSchema } from 'src/entities/employee'

export const PrenominaModel: ModelDefinition = {
  name: PrenominaEntity.name,
  schema: PrenominaSchema
}
