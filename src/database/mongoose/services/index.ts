import { CLIENT_SERVICES } from './client'
import { COMPANY_SERVICES } from './company'
import { CORE_SERVICES } from './core'
import { EMPLOYEE_SERVICES } from './employee'
import { PROCESS_SERVICES } from './process'
import { RECRUIMENT_SERVICES } from './recruiment'
import { USER_SERVICES } from './user'

export const MONGOOSE_SERVICES = [
  ...CLIENT_SERVICES,
  ...COMPANY_SERVICES,
  ...CORE_SERVICES,
  ...EMPLOYEE_SERVICES,
  ...PROCESS_SERVICES,
  ...RECRUIMENT_SERVICES,
  ...USER_SERVICES
]
