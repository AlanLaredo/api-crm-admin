import { CORE_SERVICES } from './core'
// import { INVENTORY_MONGOOSE_SERVICES } from './inventory'

import { USER_SERVICES } from './users'

export const MONGOOSE_SERVICES = [
  ...CORE_SERVICES,
  // ...INVENTORY_MONGOOSE_SERVICES,
  ...USER_SERVICES
]
