import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { PROCESS_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...PROCESS_RESOLVERS
  ],
  exports: []
})
export class ProcessModule {
  constructor () {
    console.log('Process module sucessfully initialized.')
  }
}
