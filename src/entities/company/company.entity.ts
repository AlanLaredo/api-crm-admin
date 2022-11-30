import { Prop } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

// @Schema({
//   collection: 'companies'
// })
export class CompanyEntity extends IdentityLogEntity {
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
