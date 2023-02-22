import { ClientServiceResolver } from './client-service.resolver'
import { ClientResolver } from './client.resolver'
import { ProjectedDataResolver } from './projected-data.resolver'
import { ProjectedPeriodResolver } from './projected-period.resolver'

export const CLIENT_RESOLVERS = [
  ClientServiceResolver,
  ClientResolver,
  ProjectedDataResolver,
  ProjectedPeriodResolver
]

export {
  ClientServiceResolver,
  ClientResolver,
  ProjectedDataResolver,
  ProjectedPeriodResolver
}
