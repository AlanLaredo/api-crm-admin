import { IModel } from '../../interfaces'
import { ClientServiceModel } from './client-service.model'
import { ClientModel } from './client.model'
import { ProjectedDataModel } from './projected-data.model'
import { ProjectedPeriodModel } from './projected-period.model'

export const CLIENT_MODELS: IModel[] = [
  ClientModel,
  ClientServiceModel,
  ProjectedDataModel,
  ProjectedPeriodModel
]
