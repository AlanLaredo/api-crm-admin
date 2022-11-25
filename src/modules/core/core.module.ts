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
export class CoreModule {
  constructor () {
    console.log('Core module sucessfully initialized.')
  }
}
