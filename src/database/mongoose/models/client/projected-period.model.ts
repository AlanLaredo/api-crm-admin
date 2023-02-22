import { ModelDefinition } from '@nestjs/mongoose'

import { ProjectedPeriodEntity, ProjectedPeriodSchema } from 'src/entities/client'

export const ProjectedPeriodModel: ModelDefinition = {
  name: ProjectedPeriodEntity.name,
  schema: ProjectedPeriodSchema
}
