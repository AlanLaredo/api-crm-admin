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
export class ClientsModule {
  constructor () {
    console.log('Clients module sucessfully initialized.')
  }
}
