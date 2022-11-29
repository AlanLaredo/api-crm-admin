import { IModel } from '../../interfaces'
import { EmployeeReassignmentModel, EmployeeReassignment } from './employee-reassignment.model'
import { EmployeeModel, Employee } from './employee.model'

export const EMPLOYEE_MODELS: IModel[] = [
  EmployeeReassignmentModel,
  EmployeeModel
]

export {
  EmployeeReassignment,
  Employee
}
