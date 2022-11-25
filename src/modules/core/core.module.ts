import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class CoreModule {
  constructor () {
    console.log('Core module sucessfully initialized.')
  }
}
