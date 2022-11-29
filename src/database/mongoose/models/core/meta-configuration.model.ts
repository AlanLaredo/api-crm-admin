import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'meta_configuration'
})
export class MetaConfiguration extends IdentityLogSchema {
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

export const MetaConfigurationSchema = SchemaFactory.createForClass(MetaConfiguration)

export const MetaConfigurationModel: ModelDefinition = {
  name: MetaConfiguration.name,
  schema: MetaConfigurationSchema
}
