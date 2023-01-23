import { IModel } from '../../interfaces'
import { EmployeeReassignmentModel } from './employee-reassignment.model'
import { EmployeeModel } from './employee.model'
import { NominaModel } from './nomina.model'
import { OperationModel } from './operation.model'
import { PrenominaModel } from './prenomina.model'

export const EMPLOYEE_MODELS: IModel[] = [
  EmployeeReassignmentModel,
  EmployeeModel,
  OperationModel,
  PrenominaModel,
  NominaModel
]
