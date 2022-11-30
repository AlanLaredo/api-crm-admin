import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { PositionEntity } from 'src/entities/recruiment'

@Schema({
  collection: 'positions'
})
export class Position extends PositionEntity {
}

export const PositionModel: ModelDefinition = {
  name: Position.name,
  schema: SchemaFactory.createForClass(Position)
}
