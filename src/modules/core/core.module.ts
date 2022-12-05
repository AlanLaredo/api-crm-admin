import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { CORE_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...CORE_RESOLVERS
  ],
  exports: []
})
export class CoreModule {
  constructor () {
    console.log('Core module sucessfully initialized.')
  }
}
