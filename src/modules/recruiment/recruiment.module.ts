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
export class RecruimentModule {
  constructor () {
    console.log('RecruimentModule sucessfully initialized.')
  }
}
