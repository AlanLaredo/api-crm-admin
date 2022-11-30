import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProcessEntity } from 'src/entities/process'

@Schema({
  collection: 'processes'
})
export class Process extends ProcessEntity {
}

export const ProcessModel: ModelDefinition = {
  name: Process.name,
  schema: SchemaFactory.createForClass(Process)
}
