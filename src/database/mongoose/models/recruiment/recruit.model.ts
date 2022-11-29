import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'recruits'
})
export class Recruit extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true, unique: true })
    data!: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    jobVacancyId!: Types.ObjectId

  @Prop({ required: true })
    interviewerName!: string

  @Prop({ type: [String] })
    requiredDocuments?: string[]

  @Prop()
    requiredInfo?: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    statusApplicantId!: Types.ObjectId
}

export const RecruitSchema = SchemaFactory.createForClass(Recruit)

export const RecruitModel: ModelDefinition = {
  name: Recruit.name,
  schema: RecruitSchema
}
