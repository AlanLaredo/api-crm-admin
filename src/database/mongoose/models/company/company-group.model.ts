import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CompanyGroupEntity } from 'src/entities/company'

@Schema({
  collection: 'company_groups'
})
export class CompanyGroup extends CompanyGroupEntity {
}

export const CompanyGroupSchema = SchemaFactory.createForClass(CompanyGroup)

export const CompanyGroupModel: ModelDefinition = {
  name: CompanyGroup.name,
  schema: CompanyGroupSchema
}
