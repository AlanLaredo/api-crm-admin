import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class ProcessModule {
  constructor () {
    console.log('Process module sucessfully initialized.')
  }
}
