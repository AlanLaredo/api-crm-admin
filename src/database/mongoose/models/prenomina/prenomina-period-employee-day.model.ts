import { ModelDefinition } from '@nestjs/mongoose'

import { PrenominaPeriodEmployeeDayEntity, PrenominaPeriodEmployeeDaySchema } from 'src/entities/prenomina'

export const PrenominaPeriodEmployeeDayModel: ModelDefinition = {
  name: PrenominaPeriodEmployeeDayEntity.name,
  schema: PrenominaPeriodEmployeeDaySchema
}
