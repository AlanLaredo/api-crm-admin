import { ModelDefinition } from '@nestjs/mongoose'

import { NominaEntity, NominaSchema } from 'src/entities/employee'

export const NominaModel: ModelDefinition = {
  name: NominaEntity.name,
  schema: NominaSchema
}
