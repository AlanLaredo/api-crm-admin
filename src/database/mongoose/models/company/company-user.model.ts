import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CompanyUserEntity } from 'src/entities/company'

@Schema({
  collection: 'company_users'
})
export class CompanyUser extends CompanyUserEntity {
}

export const CompanyUserModel: ModelDefinition = {
  name: CompanyUser.name,
  schema: SchemaFactory.createForClass(CompanyUser)
}
