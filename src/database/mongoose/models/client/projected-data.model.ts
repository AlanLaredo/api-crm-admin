import { ModelDefinition } from '@nestjs/mongoose'

import { ProjectedDataEntity, ProjectedDataSchema } from 'src/entities/client'

export const ProjectedDataModel: ModelDefinition = {
  name: ProjectedDataEntity.name,
  schema: ProjectedDataSchema
}
