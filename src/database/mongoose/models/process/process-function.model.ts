import { ModelDefinition } from '@nestjs/mongoose'

import { ProcessFunctionEntity, ProcessFunctionSchema } from 'src/entities/process'

export const ProcessFunctionModel: ModelDefinition = {
  name: ProcessFunctionEntity.name,
  schema: ProcessFunctionSchema
}
