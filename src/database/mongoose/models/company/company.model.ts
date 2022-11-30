import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CompanyEntity } from 'src/entities/company'

@Schema({
  collection: 'companies'
})
export class Company extends CompanyEntity {
}

export const CompanyModel: ModelDefinition = {
  name: Company.name,
  schema: SchemaFactory.createForClass(Company)
}
