import { EmployeeReassignmentResolver } from './employee-reassignment.resolver'
import { EmployeeResolver } from './employee.resolver'

export const EMPLOYEE_RESOLVERS = [
  EmployeeReassignmentResolver,
  EmployeeResolver
]

export {
  EmployeeReassignmentResolver,
  EmployeeResolver
}
