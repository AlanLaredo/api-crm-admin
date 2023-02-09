import { PrenominaConfigurationService } from './prenomina-configuration.service'
import { PrenominaPeriodEmployeeDayService } from './prenomina-period-employee-day.service'
import { PrenominaPeriodEmployeeService } from './prenomina-period-employee.service'
import { PrenominaPeriodService } from './prenomina-period.service'

export const PRENOMINA_SERVICES = [
  PrenominaConfigurationService,
  PrenominaPeriodEmployeeDayService,
  PrenominaPeriodEmployeeService,
  PrenominaPeriodService
]

export {
  PrenominaConfigurationService,
  PrenominaPeriodEmployeeDayService,
  PrenominaPeriodEmployeeService,
  PrenominaPeriodService
}
