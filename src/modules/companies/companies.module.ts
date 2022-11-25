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
export class CompaniesModule {
  constructor () {
    console.log('Companies module sucessfully initialized.')
  }
}
