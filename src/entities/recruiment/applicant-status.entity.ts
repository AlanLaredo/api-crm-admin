import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'applicant_status'
})
export class ApplicantStatusEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string
}

export const ApplicantStatusSchema = SchemaFactory.createForClass(ApplicantStatusEntity)
