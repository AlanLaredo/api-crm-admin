import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { MetaConfigurationEntity } from 'src/entities/core'

@Schema({
  collection: 'meta_configuration'
})
export class MetaConfiguration extends MetaConfigurationEntity {
}

export const MetaConfigurationModel: ModelDefinition = {
  name: MetaConfiguration.name,
  schema: SchemaFactory.createForClass(MetaConfiguration)
}
