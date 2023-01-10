import { ModelDefinition } from '@nestjs/mongoose'

import { OperationEntity, OperationSchema } from 'src/entities/employee'

export const OperationModel: ModelDefinition = {
  name: OperationEntity.name,
  schema: OperationSchema
}
