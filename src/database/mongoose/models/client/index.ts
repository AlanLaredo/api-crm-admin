import { IModel } from '../../interfaces'
import { ClientServiceModel } from './client-service.model'
import { ClientModel } from './client.model'
import { ProjectedDataModel } from './projected-data.model'

export const CLIENT_MODELS: IModel[] = [
  ClientModel,
  ClientServiceModel,
  ProjectedDataModel
]
