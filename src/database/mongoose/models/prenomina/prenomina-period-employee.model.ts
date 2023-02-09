import { ModelDefinition } from '@nestjs/mongoose'

import { PrenominaPeriodEmployeeEntity, PrenominaPeriodEmployeeSchema } from 'src/entities/prenomina'

export const PrenominaPeriodEmployeeModel: ModelDefinition = {
  name: PrenominaPeriodEmployeeEntity.name,
  schema: PrenominaPeriodEmployeeSchema
}
