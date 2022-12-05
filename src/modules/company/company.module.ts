import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { COMPANY_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...COMPANY_RESOLVERS
  ],
  exports: []
})
export class CompanyModule {
  constructor () {
    console.log('Company module sucessfully initialized.')
  }
}
