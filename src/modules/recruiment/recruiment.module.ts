import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { RECRUIMENT_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...RECRUIMENT_RESOLVERS
  ],
  exports: []
})
export class RecruimentModule {
  constructor () {
    console.log('RecruimentModule sucessfully initialized.')
  }
}
