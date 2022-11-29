import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'job_vacancy_status'
})
export class JobVacancyStatus extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string
}

export const JobVacancyStatusSchema = SchemaFactory.createForClass(JobVacancyStatus)

export const JobVacancyStatusModel: ModelDefinition = {
  name: JobVacancyStatus.name,
  schema: JobVacancyStatusSchema
}
