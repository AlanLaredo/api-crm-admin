import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { ClientEntity } from 'src/entities/client'

@Schema({
  collection: 'clients'
})
export class Client extends ClientEntity {
}

export const ClientModel: ModelDefinition = {
  name: Client.name,
  schema: SchemaFactory.createForClass(Client)
}
