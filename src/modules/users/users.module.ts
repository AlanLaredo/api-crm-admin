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
export class UsersModule {
  constructor () {
    console.log('Users module sucessfully initialized.')
  }
}
