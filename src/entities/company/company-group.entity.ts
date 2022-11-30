import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'company_groups'
})
export class CompanyGroupEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string
}

export const CompanyGroupSchema = SchemaFactory.createForClass(CompanyGroupEntity)
