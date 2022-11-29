import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'companies'
})
export class Company extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    name!: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyGroupId?: Types.ObjectId

  @Prop()
    logoImagePath?: string

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyId?: Types.ObjectId
}

export const CompanySchema = SchemaFactory.createForClass(Company)

export const CompanyModel: ModelDefinition = {
  name: Company.name,
  schema: CompanySchema
}
