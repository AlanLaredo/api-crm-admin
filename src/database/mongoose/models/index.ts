import { CLIENT_MODELS } from './clients'
import { CORE_MODELS } from './core'
import { RECRUITMENT_MODELS } from './recruiments'
import { USER_MODELS } from './user'

export const MONGOOSE_MODELS = [
  ...CLIENT_MODELS,
  ...CORE_MODELS,
  ...RECRUITMENT_MODELS,
  ...USER_MODELS
]
