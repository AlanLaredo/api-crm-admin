import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class AuthModule {
  constructor () {
    console.log('Auth module sucessfully initialized.')
  }
}
