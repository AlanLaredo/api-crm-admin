import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApplicantStatusEntity } from 'src/entities/recruiment'

@Schema({
  collection: 'applicant_status'
})
export class ApplicantStatus extends ApplicantStatusEntity {
}

export const ApplicantStatusModel: ModelDefinition = {
  name: ApplicantStatus.name,
  schema: SchemaFactory.createForClass(ApplicantStatus)
}
