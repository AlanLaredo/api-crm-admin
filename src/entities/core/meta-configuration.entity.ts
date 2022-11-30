import { Prop } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

// @Schema({
//   collection: 'meta_configuration'
// })
export class MetaConfigurationEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ type: String, required: true })
    key!: string

  @Prop({ type: String, required: false, default: null })
    value?: string

  @Prop({ type: String })
    description?: string

  @Prop({ type: Boolean, required: true, default: true })
    active!: boolean
}
