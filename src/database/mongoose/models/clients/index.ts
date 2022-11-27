import { IModel } from '../../interfaces'
import { ClientModel, ClientSchema } from './client.model'

export const CLIENT_MODELS: IModel[] = [{
  name: ClientModel.name,
  schema: ClientSchema
}]

export {
  ClientModel
}
