import { IModel } from '../../interfaces'
import { ClientService, ClientServiceModel } from './client-service.model'
import { Client, ClientModel } from './client.model'

export const CLIENT_MODELS: IModel[] = [
  ClientModel,
  ClientServiceModel
]

export {
  Client,
  ClientService
}
