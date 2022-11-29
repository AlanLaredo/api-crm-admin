import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'company_groups'
})
export class CompanyGroup extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string
}

export const CompanyGroupSchema = SchemaFactory.createForClass(CompanyGroup)

export const CompanyGroupModel: ModelDefinition = {
  name: CompanyGroup.name,
  schema: CompanyGroupSchema
}
