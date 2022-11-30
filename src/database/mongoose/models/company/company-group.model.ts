import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CompanyGroupEntity } from 'src/entities/company'

@Schema({
  collection: 'company_groups'
})
export class CompanyGroup extends CompanyGroupEntity {
}

export const CompanyGroupModel: ModelDefinition = {
  name: CompanyGroup.name,
  schema: SchemaFactory.createForClass(CompanyGroup)
}
