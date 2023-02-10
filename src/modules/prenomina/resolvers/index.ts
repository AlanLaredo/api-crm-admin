import { PrenominaConfigurationResolver } from './prenomina-configuration.resolver'
import { PrenominaPeriodEmployeeDayResolver } from './prenomina-period-employee-day.resolver'
import { PrenominaPeriodEmployeeResolver } from './prenomina-period-employee.resolver'
import { PrenominaPeriodResolver } from './prenomina-period.resolver'

export const PRENOMINA_RESOLVERS = [
  PrenominaConfigurationResolver,
  PrenominaPeriodEmployeeResolver,
  PrenominaPeriodEmployeeDayResolver,
  PrenominaPeriodResolver
]

export {
  PrenominaConfigurationResolver,
  PrenominaPeriodEmployeeResolver,
  PrenominaPeriodEmployeeDayResolver,
  PrenominaPeriodResolver
}
