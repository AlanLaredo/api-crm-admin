import { EmployeeReassignmentService } from './employee-reassignment.service'
import { EmployeeService } from './employee.service'
import { OperationService } from './operation.service'
import { PrenominaService } from './prenomina.service'
import { NominaService } from './nomina.service'

export const EMPLOYEE_SERVICES = [
  EmployeeReassignmentService,
  EmployeeService,
  OperationService,
  PrenominaService,
  NominaService
]

export {
  EmployeeReassignmentService,
  EmployeeService,
  OperationService,
  PrenominaService,
  NominaService
}
