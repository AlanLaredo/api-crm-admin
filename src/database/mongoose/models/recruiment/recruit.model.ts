import { ModelDefinition } from '@nestjs/mongoose'

import { RecruitEntity, RecruitSchema } from 'src/entities/recruiment'

export const RecruitModel: ModelDefinition = {
  name: RecruitEntity.name,
  schema: RecruitSchema
}
