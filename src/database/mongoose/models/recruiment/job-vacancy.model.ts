import { ModelDefinition } from '@nestjs/mongoose'

import { JobVacancyEntity, JobVacancySchema } from 'src/entities/recruiment'

export const JobVacancyModel: ModelDefinition = {
  name: JobVacancyEntity.name,
  schema: JobVacancySchema
}
