import { IModel } from '../../interfaces'
import { EmployeeReassignmentModel } from './employee-reassignment.model'
import { EmployeeModel } from './employee.model'
import { OperationModel } from './operation.model'

export const EMPLOYEE_MODELS: IModel[] = [
  EmployeeReassignmentModel,
  EmployeeModel,
  OperationModel
]
