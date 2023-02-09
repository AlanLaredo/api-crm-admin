import { IModel } from '../../interfaces'
import { PrenominaConfigurationModel } from './prenomina-configuration.model'
import { PrenominaPeriodEmployeeDayModel } from './prenomina-period-employee-day.model'
import { PrenominaPeriodEmployeeModel } from './prenomina-period-employee.model'
import { PrenominaPeriodModel } from './prenomina-period.model'

export const PRENOMINA_MODELS: IModel[] = [
  PrenominaConfigurationModel,
  PrenominaPeriodEmployeeDayModel,
  PrenominaPeriodEmployeeModel,
  PrenominaPeriodModel
]
