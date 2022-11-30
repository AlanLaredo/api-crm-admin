import { ModelDefinition } from '@nestjs/mongoose'

import { JobVacancyStatusEntity, JobVacancyStatusSchema } from 'src/entities/recruiment'

export const JobVacancyStatusModel: ModelDefinition = {
  name: JobVacancyStatusEntity.name,
  schema: JobVacancyStatusSchema
}
