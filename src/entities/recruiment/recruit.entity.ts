import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'recruits'
})
export class RecruitEntity extends IdentityLogEntity {
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
