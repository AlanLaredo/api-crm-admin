import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
// import { PRENOMIONA_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    // ...PRENOMIONA_RESOLVERS
  ],
  exports: []
})
export class PrenomionaModule {
  constructor () {
    console.log('Prenomiona module sucessfully initialized.')
  }
}
