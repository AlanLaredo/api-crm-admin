import { CLIENT_MODELS } from './client'
import { COMPANY_MODELS } from './company'
import { CORE_MODELS } from './core'
import { EMPLOYEE_MODELS } from './employee'
import { PRENOMINA_MODELS } from './prenomina'
import { PROCESS_MODELS } from './process'
import { RECRUITMENT_MODELS } from './recruiment'
import { USER_MODELS } from './user'

export const MONGOOSE_MODELS = [
  ...CLIENT_MODELS,
  ...COMPANY_MODELS,
  ...CORE_MODELS,
  ...EMPLOYEE_MODELS,
  ...PROCESS_MODELS,
  ...RECRUITMENT_MODELS,
  ...USER_MODELS,
  ...PRENOMINA_MODELS
]
