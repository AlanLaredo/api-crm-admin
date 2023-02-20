import { ClientServiceResolver } from './client-service.resolver'
import { ClientResolver } from './client.resolver'
import { ProjectedDataResolver } from './projected-data.resolver'

export const CLIENT_RESOLVERS = [
  ClientServiceResolver,
  ClientResolver,
  ProjectedDataResolver
]

export {
  ClientServiceResolver,
  ClientResolver,
  ProjectedDataResolver
}
