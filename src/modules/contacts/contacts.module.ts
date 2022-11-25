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
export class ContactsModule {
  constructor () {
    console.log('Contacts module sucessfully initialized.')
  }
}
