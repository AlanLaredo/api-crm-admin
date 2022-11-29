import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'applicant_status'
})
export class ApplicantStatus extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string
}

export const ApplicantStatusSchema = SchemaFactory.createForClass(ApplicantStatus)

export const ApplicantStatusModel: ModelDefinition = {
  name: ApplicantStatus.name,
  schema: ApplicantStatusSchema
}
