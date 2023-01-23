import { EmployeeReassignmentResolver } from './employee-reassignment.resolver'
import { EmployeeResolver } from './employee.resolver'
import { NominaResolver } from './nomina.resolver'
import { OperationResolver } from './operation.resolver'
import { PrenominaResolver } from './prenomina.resolver'

export const EMPLOYEE_RESOLVERS = [
  EmployeeReassignmentResolver,
  EmployeeResolver,
  OperationResolver,
  PrenominaResolver,
  NominaResolver
]

export {
  EmployeeReassignmentResolver,
  EmployeeResolver,
  OperationResolver,
  PrenominaResolver,
  NominaResolver
}
