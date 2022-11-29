import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'job_vacancies'
})
export class JobVacancy extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Prop({ required: true })
    totalVacancies!: number

  @Prop({ type: [String] })
    requiredDocumentsPath?: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    jobVacanciesStatusId!: Types.ObjectId
}

export const JobVacancySchema = SchemaFactory.createForClass(JobVacancy)

export const JobVacancyModel: ModelDefinition = {
  name: JobVacancy.name,
  schema: JobVacancySchema
}
