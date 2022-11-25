import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class ContactsModule {
  constructor () {
    console.log('Contacts module sucessfully initialized.')
  }
}
