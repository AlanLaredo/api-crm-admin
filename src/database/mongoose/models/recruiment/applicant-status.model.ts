import { ModelDefinition } from '@nestjs/mongoose'

import { ApplicantStatusEntity, ApplicantStatusSchema } from 'src/entities/recruiment'

export const ApplicantStatusModel: ModelDefinition = {
  name: ApplicantStatusEntity.name,
  schema: ApplicantStatusSchema
}
