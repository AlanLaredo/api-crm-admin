import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { CLIENT_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...CLIENT_RESOLVERS
  ],
  exports: []
})
export class ClientModule {
  constructor () {
    console.log('Client module sucessfully initialized.')
  }
}
