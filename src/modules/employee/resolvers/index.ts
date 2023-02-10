import { EmployeeReassignmentResolver } from './employee-reassignment.resolver'
import { EmployeeResolver } from './employee.resolver'
import { OperationResolver } from './operation.resolver'

export const EMPLOYEE_RESOLVERS = [
  EmployeeReassignmentResolver,
  EmployeeResolver,
  OperationResolver
]

export {
  EmployeeReassignmentResolver,
  EmployeeResolver,
  OperationResolver
}
