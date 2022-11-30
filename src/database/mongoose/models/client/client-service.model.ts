import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { ClientServiceEntity } from 'src/entities/client'

@Schema({
  collection: 'client_services'
})
export class ClientService extends ClientServiceEntity {
}

export const ClientServiceModel: ModelDefinition = {
  name: ClientService.name,
  schema: SchemaFactory.createForClass(ClientService)
}
