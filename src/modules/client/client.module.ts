import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { CLIENT_RESOLVERS } from './resolvers'
import { CLIENT_SERVICES } from './services'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...CLIENT_RESOLVERS,
    ...CLIENT_SERVICES
  ],
  exports: [
    ...CLIENT_SERVICES
  ]
})
export class ClientModule {
  constructor () {
    console.log('Client module sucessfully initialized.')
  }
}
