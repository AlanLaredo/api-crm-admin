import { IModel } from '../../interfaces'
import { CompanyModel, Company } from './company.model'
import { CompanyGroupModel, CompanyGroup } from './company-group.model'
import { CompanyUserModel, CompanyUser } from './company-user.model'

export const COMPANY_MODELS: IModel[] = [
  CompanyModel,
  CompanyGroupModel,
  CompanyUserModel
]

export {
  Company,
  CompanyGroup,
  CompanyUser
}
