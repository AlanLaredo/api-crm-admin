import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { PRENOMINA_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...PRENOMINA_RESOLVERS
  ],
  exports: []
})
export class PrenomionaModule {
  constructor () {
    console.log('Prenomiona module sucessfully initialized.')
  }
}
