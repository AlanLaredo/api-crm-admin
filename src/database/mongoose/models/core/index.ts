import { IModel } from '../../interfaces'
import { ActionLogModel, ActionLogSchema } from './action-log.model'
import { MetaConfigurationModel, MetaConfigurationSchema } from './meta-configuration.model'

export const CORE_MODELS: IModel[] = [{
  name: ActionLogModel.name,
  schema: ActionLogSchema
}, {
  name: MetaConfigurationModel.name,
  schema: MetaConfigurationSchema
}]

export {
  ActionLogModel,
  MetaConfigurationModel
}
