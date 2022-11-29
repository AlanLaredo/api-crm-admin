import { CustomerService } from './customer.service'
import { ProcessFunctionService } from './process-function.service'
import { ProcessService } from './process.service'

export const PROCESS_SERVICES = [
  CustomerService,
  ProcessFunctionService,
  ProcessService
]

export {
  CustomerService,
  ProcessFunctionService,
  ProcessService
}
