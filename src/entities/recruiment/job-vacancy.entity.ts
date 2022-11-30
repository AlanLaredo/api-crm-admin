import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'job_vacancies'
})
export class JobVacancyEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Prop({ required: true })
    totalVacancies!: number

  @Prop({ type: [String] })
    requiredDocumentsPaths?: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    jobVacanciesStatusId!: Types.ObjectId
}

export const JobVacancySchema = SchemaFactory.createForClass(JobVacancyEntity)
