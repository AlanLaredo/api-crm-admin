import { IModel } from '../../interfaces'
import { CustomerModel, Customer } from './customer.model'
import { ProcessFunctionModel, ProcessFunction } from './process-function.model'
import { ProcessModel, Process } from './process.model'

export const PROCESS_MODELS: IModel[] = [
  CustomerModel,
  ProcessModel,
  ProcessFunctionModel
]

export {
  Customer,
  Process,
  ProcessFunction
}
