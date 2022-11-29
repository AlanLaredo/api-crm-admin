import { CLIENT_MODELS } from './clients'
import { CORE_MODELS } from './core'
import { PROCESS_MODELS } from './process'
import { RECRUITMENT_MODELS } from './recruiments'
import { USER_MODELS } from './user'

export const MONGOOSE_MODELS = [
  ...CLIENT_MODELS,
  ...CORE_MODELS,
  ...PROCESS_MODELS,
  ...RECRUITMENT_MODELS,
  ...USER_MODELS
]
