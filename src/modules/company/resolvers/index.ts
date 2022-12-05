import { CompanyGroupResolver } from './company-group.resolver'
import { CompanyUserResolver } from './company-user.resolver'
import { CompanyResolver } from './company.resolver'

export const COMPANY_RESOLVERS = [
  CompanyGroupResolver,
  CompanyUserResolver,
  CompanyResolver
]

export {
  CompanyGroupResolver,
  CompanyUserResolver,
  CompanyResolver
}
