import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { INVENTORY_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...INVENTORY_RESOLVERS
  ],
  controllers: [
  ],
  exports: [
  ]
})
export class InventoryModule {
  constructor () {
    console.log('InventoryModule sucessfully initialized.')
  }
}
