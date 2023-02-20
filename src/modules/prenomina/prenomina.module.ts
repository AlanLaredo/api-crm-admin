import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { PRENOMINA_CONTROLLERS } from './controllers'
import { PRENOMINA_RESOLVERS } from './resolvers'
import { PRENOMINA_SERVICES } from './services'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...PRENOMINA_RESOLVERS,
    ...PRENOMINA_SERVICES
  ],
  controllers: [
    ...PRENOMINA_CONTROLLERS
  ],
  exports: [
    ...PRENOMINA_SERVICES
  ]
})
export class PrenomionaModule {
  constructor () {
    console.log('Prenomiona module sucessfully initialized.')
  }
}
