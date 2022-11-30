import { IModel } from '../../interfaces'
import { CompanyModel } from './company.model'
import { CompanyGroupModel } from './company-group.model'
import { CompanyUserModel } from './company-user.model'

export const COMPANY_MODELS: IModel[] = [
  CompanyModel,
  CompanyGroupModel,
  CompanyUserModel
]
