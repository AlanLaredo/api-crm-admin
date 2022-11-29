import { IModel } from '../../interfaces'
import { ActionLogModel, ActionLog } from './action-log.model'
import { MetaConfigurationModel, MetaConfiguration } from './meta-configuration.model'

export const CORE_MODELS: IModel[] = [
  ActionLogModel,
  MetaConfigurationModel
]

export {
  ActionLog,
  MetaConfiguration
}
