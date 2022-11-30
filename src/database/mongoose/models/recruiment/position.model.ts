import { ModelDefinition } from '@nestjs/mongoose'

import { PositionEntity, PositionSchema } from 'src/entities/recruiment'

export const PositionModel: ModelDefinition = {
  name: PositionEntity.name,
  schema: PositionSchema
}
