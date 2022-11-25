import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class UsersModule {
  constructor () {
    console.log('Users module sucessfully initialized.')
  }
}
