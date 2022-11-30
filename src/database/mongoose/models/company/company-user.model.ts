import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CompanyUserEntity } from 'src/entities/company'

@Schema({
  collection: 'company_users'
})
export class CompanyUser extends CompanyUserEntity {
}

export const CompanyUserSchema = SchemaFactory.createForClass(CompanyUser)

export const CompanyUserModel: ModelDefinition = {
  name: CompanyUser.name,
  schema: CompanyUserSchema
}
