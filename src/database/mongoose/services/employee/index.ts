import { EmployeeReassignmentService } from './employee-reassignment.service'
import { EmployeeService } from './employee.service'
import { OperationService } from './operation.service'

export const EMPLOYEE_SERVICES = [
  EmployeeReassignmentService,
  EmployeeService,
  OperationService
]

export {
  EmployeeReassignmentService,
  EmployeeService,
  OperationService
}
