import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { JobVacancyEntity } from 'src/entities/recruiment'

@Schema({
  collection: 'job_vacancies'
})
export class JobVacancy extends JobVacancyEntity {
}

export const JobVacancyModel: ModelDefinition = {
  name: JobVacancy.name,
  schema: SchemaFactory.createForClass(JobVacancy)
}
