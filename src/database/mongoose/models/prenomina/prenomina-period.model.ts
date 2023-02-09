import { ModelDefinition } from '@nestjs/mongoose'

import { PrenominaPeriodEntity, PrenominaPeriodSchema } from 'src/entities/prenomina'

export const PrenominaPeriodModel: ModelDefinition = {
  name: PrenominaPeriodEntity.name,
  schema: PrenominaPeriodSchema
}
