import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class CompaniesModule {
  constructor () {
    console.log('Companies module sucessfully initialized.')
  }
}
