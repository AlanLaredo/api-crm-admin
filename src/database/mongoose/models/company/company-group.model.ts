import { ModelDefinition } from '@nestjs/mongoose'

import { CompanyGroupEntity, CompanyGroupSchema } from 'src/entities/company'

export const CompanyGroupModel: ModelDefinition = {
  name: CompanyGroupEntity.name,
  schema: CompanyGroupSchema
}
