import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { JobVacancyStatusEntity } from 'src/entities/recruiment'

@Schema({
  collection: 'job_vacancy_status'
})
export class JobVacancyStatus extends JobVacancyStatusEntity {
}

export const JobVacancyStatusModel: ModelDefinition = {
  name: JobVacancyStatus.name,
  schema: SchemaFactory.createForClass(JobVacancyStatus)
}
