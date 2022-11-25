import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class ClientsModule {
  constructor () {
    console.log('Clients module sucessfully initialized.')
  }
}
