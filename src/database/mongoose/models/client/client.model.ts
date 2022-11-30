import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { ClientEntity } from 'src/entities/client'

@Schema({
  collection: 'clients'
})
export class Client extends ClientEntity {
}

export const ClientSchema = SchemaFactory.createForClass(Client)

export const ClientModel: ModelDefinition = {
  name: Client.name,
  schema: ClientSchema
}
