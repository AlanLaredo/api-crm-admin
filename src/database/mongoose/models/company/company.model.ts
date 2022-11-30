import { ModelDefinition } from '@nestjs/mongoose'

import { CompanyEntity, CompanySchema } from 'src/entities/company'

export const CompanyModel: ModelDefinition = {
  name: CompanyEntity.name,
  schema: CompanySchema
}
