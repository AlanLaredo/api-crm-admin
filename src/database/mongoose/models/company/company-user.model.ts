import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'company_users'
})
export class CompanyUser extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId
}

export const CompanyUserSchema = SchemaFactory.createForClass(CompanyUser)

export const CompanyUserModel: ModelDefinition = {
  name: CompanyUser.name,
  schema: CompanyUserSchema
}
