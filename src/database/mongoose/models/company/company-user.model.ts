import { ModelDefinition } from '@nestjs/mongoose'

import { CompanyUserEntity, CompanyUserSchema } from 'src/entities/company'

export const CompanyUserModel: ModelDefinition = {
  name: CompanyUserEntity.name,
  schema: CompanyUserSchema
}
