import { ModelDefinition } from '@nestjs/mongoose'

import { ProcessEntity, ProcessSchema } from 'src/entities/process'

export const ProcessModel: ModelDefinition = {
  name: ProcessEntity.name,
  schema: ProcessSchema
}
