import { IModel } from '../../interfaces'
import { CustomerModel } from './customer.model'
import { ProcessFunctionModel } from './process-function.model'
import { ProcessModel } from './process.model'

export const PROCESS_MODELS: IModel[] = [
  CustomerModel,
  ProcessModel,
  ProcessFunctionModel
]
