import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { USER_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...USER_RESOLVERS
  ],
  exports: []
})
export class UserModule {
  constructor () {
    console.log('User module sucessfully initialized.')
  }
}
