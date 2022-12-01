import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [],
  exports: []
})
export class CompanyModule {
  constructor () {
    console.log('Company module sucessfully initialized.')
  }
}
