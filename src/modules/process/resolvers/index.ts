import { CustomerResolver } from './customer.resolver'
import { ProcessFunctionResolver } from './process-function.resolver'
import { ProcessResolver } from './process.resolver'

export const PROCESS_RESOLVERS = [
  CustomerResolver,
  ProcessFunctionResolver,
  ProcessResolver
]

export {
  CustomerResolver,
  ProcessFunctionResolver,
  ProcessResolver
}
