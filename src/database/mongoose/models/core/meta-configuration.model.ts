import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogModel } from '../common'

@Schema({
  collection: 'meta_configuration'
})
export class MetaConfigurationModel extends IdentityLogModel {
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

export const MetaConfigurationSchema = SchemaFactory.createForClass(MetaConfigurationModel)
