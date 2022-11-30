import { Prop } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

// @Schema({
//   collection: 'company_users'
// })
export class CompanyUserEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId
}
