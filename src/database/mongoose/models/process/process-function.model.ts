import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProcessFunctionEntity } from 'src/entities/process'

@Schema({
  collection: 'process_functions'
})
export class ProcessFunction extends ProcessFunctionEntity {
}

export const ProcessFunctionModel: ModelDefinition = {
  name: ProcessFunction.name,
  schema: SchemaFactory.createForClass(ProcessFunction)
}
